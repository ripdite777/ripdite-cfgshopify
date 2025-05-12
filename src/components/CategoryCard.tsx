
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
  slug: string;
  count: number;
}

const CategoryCard = ({
  title,
  icon,
  description,
  imageUrl,
  slug,
  count
}: CategoryCardProps) => {
  return (
    <Link to={`/catalog?category=${slug}`}>
      <div className="rounded-lg overflow-hidden relative h-40 card-hover">
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="flex items-center mb-1">
            <span className="text-xl mr-2">{icon}</span>
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
          <div className="text-xs text-gaming-400 font-medium">{count} products</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
