
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import Layout from '@/components/Layout';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const { products, addToCart } = useStore();

  const featuredProducts = products.filter(product => product.isFeatured);
  const freeProducts = products.filter(product => product.price === 0);

  const categories = [
    {
      title: "CFGs",
      icon: "✅",
      description: "Best player configurations for optimal gameplay and aim",
      imageUrl: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWVyJTIwc2V0dGluZ3N8ZW58MHx8MHx8fDA%3D",
      slug: "cfgs",
      count: products.filter(p => p.category === "CFGs").length
    },
    {
      title: "DLLs",
      icon: "⚙️",
      description: "Aimbot, psilent, aimlock and optimal gameplay DLLS",
      imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdhbWluZyUyMGhhcmR3YXJlfGVufDB8fDB8fHww",
      slug: "dlls",
      count: products.filter(p => p.category === "DLLs").length
    },
    {
      title: "REG Tweaks",
      icon: "🧬",
      description: "System optimizations for improved gaming performance",
      imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlZ2lzdHJ5fGVufDB8fDB8fHww",
      slug: "regs", 
      count: products.filter(p => p.category === "REGs").length
    },
    {
      title: "Scripts",
      icon: "🎯",
      description: "Automation tools and advanced game scripts, macros",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29kaW5nfGVufDB8fDB8fHww",
      slug: "scripts",
      count: products.filter(p => p.category === "Scripts").length
    }
  ];

  const featuredCarouselItems = [
    <div key="hero-1" className="relative h-[500px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop')",
          filter: "brightness(0.5)"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
      <div className="relative h-full container mx-auto flex items-center">
        <div className="max-w-2xl p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Boost Your <span className="text-gaming-400 text-glow">CS 1.6</span> Game
          </h1>
          <p className="text-lg md:text-xl mb-6 text-muted-foreground">
            Download or buy elite game tweaks to gain the competitive edge. Professionally crafted configs, performance enhancers, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gaming-500 hover:bg-gaming-400 text-black font-bold">
              Browse Store
            </Button>
            <Button variant="outline" size="lg">
              Free Downloads
            </Button>
          </div>
        </div>
      </div>
    </div>,
    <div key="hero-2" className="relative h-[500px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1541560052-5e137f229371?w=800&auto=format&fit=crop')",
          filter: "brightness(0.5)" 
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
      <div className="relative h-full container mx-auto flex items-center">
        <div className="max-w-2xl p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Best Shop For <span className="text-neon-green">CFGs</span> & Settings
          </h1>
          <p className="text-lg md:text-xl mb-6 text-muted-foreground">
            Play like the pros with our collection of authentic configurations and tweaks. Improve your aim, movement, and visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-neon-green hover:bg-neon-green/80 text-black font-bold">
              CFGs DLLs Tweaks
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section className="mb-12">
        <FeaturedCarousel items={featuredCarouselItems} />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link to="/catalog" className="text-gaming-400 flex items-center hover:text-gaming-300">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              title={category.title}
              icon={category.icon}
              description={category.description}
              imageUrl={category.imageUrl}
              slug={category.slug}
              count={category.count}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/catalog" className="text-gaming-400 flex items-center hover:text-gaming-300">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
      </section>
      
      {/* Free Downloads */}
      {freeProducts.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Free Downloads</h2>
            <Link to="/catalog?free=true" className="text-gaming-400 flex items-center hover:text-gaming-300">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
                category={product.category}
                tags={product.tags}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Why Choose Us */}
      <section className="bg-secondary py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Why Choose Our CS 1.6 Products?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-gaming-500/10 h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Safe & Legal</h3>
              <p className="text-muted-foreground">Our products are developed to be undetected and VAC-safe, keeping your account secure.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-gaming-500/10 h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Performance Boost</h3>
              <p className="text-muted-foreground">Experience significant FPS improvements, reduced input lag, and better network performance.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-gaming-500/10 h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Wargods Bypassable</h3>
              <p className="text-muted-foreground">Products developed by me and bypassed wargods and teamviewer for advantage.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-card rounded-lg p-8 border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">Subscribe to our newsletter for updates, exclusive discounts, and free products.</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-gaming-500"
              />
              <Button className="bg-gaming-600 hover:bg-gaming-500">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
