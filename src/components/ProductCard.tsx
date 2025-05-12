
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tags: string[];
  isFeatured?: boolean;
  onAddToCart: (id: string) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  description, 
  image, 
  category, 
  tags, 
  isFeatured, 
  onAddToCart 
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(id);
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cfgs':
        return '✅';
      case 'dlls':
        return '⚙️';
      case 'regs':
        return '🧬';
      case 'scripts':
        return '🎯';
      default:
        return '📁';
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg bg-card card-hover",
          isFeatured && "border border-gaming-600"
        )}
      >
        {isFeatured && (
          <div className="absolute top-3 right-0 bg-gaming-500 text-xs font-medium py-1 px-3 rounded-l-full text-black">
            Featured
          </div>
        )}
        
        <div className="h-48 overflow-hidden relative">
          <img
            src={image} 
            alt={name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <Badge variant="outline" className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm">
            {getCategoryIcon(category)} {category}
          </Badge>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold truncate">{name}</h3>
            <div className="text-gaming-400 font-bold">
              {price === 0 ? 'FREE' : `$${price.toFixed(2)}`}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
          
          <div className="mb-4 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Eye size={16} className="mr-1" /> Preview
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-gaming-600 hover:bg-gaming-500"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" /> 
              {price === 0 ? 'Download' : 'Add to cart'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
