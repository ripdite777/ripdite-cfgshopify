
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/contexts/StoreContext';

const CatalogPage = () => {
  const { products, addToCart } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const allCategories = ['CFGs', 'DLLs', 'REGs', 'Scripts', 'Bundles'];
  
  // Get all unique tags from products
  const allTags = [...new Set(products.flatMap(product => product.tags))];

  // Get URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const freeParam = searchParams.get('free');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    if (freeParam === 'true') {
      setShowOnlyFree(true);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Filter products
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    );
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.some(cat => 
          product.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }
    
    // Filter only free products
    if (showOnlyFree) {
      filtered = filtered.filter(product => product.price === 0);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, priceRange, selectedCategories, selectedTags, showOnlyFree]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Handle tag selection
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 20]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setShowOnlyFree(false);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter size={20} className="mr-2" />
            Filters
            {isMobileFiltersOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={cn(
            "md:w-64 flex-shrink-0",
            isMobileFiltersOpen ? "block" : "hidden md:block"
          )}>
            <div className="bg-card rounded-lg p-4 sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <X size={16} className="mr-1" /> Clear
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 20]}
                    max={20}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Free Only */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free-only" 
                    checked={showOnlyFree}
                    onCheckedChange={() => setShowOnlyFree(!showOnlyFree)}
                  />
                  <label 
                    htmlFor="free-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Free products only
                  </label>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Tags */}
              <div className="mb-2">
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag}`} 
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagChange(tag)}
                      />
                      <label 
                        htmlFor={`tag-${tag}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    category={product.category}
                    tags={product.tags}
                    isFeatured={product.isFeatured}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-8 text-center">
                <h3 className="font-bold text-xl mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;
