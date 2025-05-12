
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, ChevronLeft, Star, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
        </div>
      </Layout>
    );
  }

  // Mock installation steps if not provided
  const installationSteps = product.installationSteps || [
    "Download the file",
    "Extract to your Counter-Strike directory",
    "Replace existing files if prompted",
    "Launch the game and enjoy"
  ];

  // Mock reviews
  const reviews = [
    {
      id: '1',
      author: 'GameMaster123',
      rating: 5,
      date: '2025-04-20',
      content: 'Excellent product! My FPS improved by 100+ and my aim is much better now. Worth every penny!'
    },
    {
      id: '2',
      author: 'CS_Legend',
      rating: 4,
      date: '2025-04-15',
      content: 'Very good configuration, but took me some time to set up properly. The instructions could be clearer.'
    },
    {
      id: '3',
      author: 'Sniper_Elite',
      rating: 5,
      date: '2025-04-10',
      content: 'This is exactly what I needed to improve my gameplay. The difference is night and day!'
    }
  ];

  // Mock images for gallery
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
  ];

  // Average rating calculation
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-muted-foreground" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </Button>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span className="text-muted-foreground mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {product.videoUrl && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                  onClick={() => setShowVideoModal(true)}
                >
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play fill="white" size={30} />
                  </div>
                </button>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-20 h-20 rounded overflow-hidden",
                    selectedImage === index && "ring-2 ring-gaming-400"
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center mb-1">
              <Badge variant="outline" className="mr-2">{product.category}</Badge>
              {product.price === 0 && <Badge className="bg-neon-green text-black">FREE</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    size={16} 
                    className={index < Math.round(avgRating) ? "fill-gaming-400 text-gaming-400" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>
            
            <div className="mb-6">
              {product.price > 0 ? (
                <div className="text-3xl font-bold text-gaming-400">${product.price.toFixed(2)}</div>
              ) : (
                <div className="text-3xl font-bold text-neon-green">FREE</div>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.fullDescription || product.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Button
                className="flex-1 bg-gaming-600 hover:bg-gaming-500 text-lg py-6"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart size={20} className="mr-2" />
                {product.price === 0 ? 'Download Now' : 'Add to Cart'}
              </Button>
              
              {product.price > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 text-lg py-6"
                  onClick={() => {
                    addToCart(product.id);
                    navigate('/cart');
                  }}
                >
                  Buy Now
                </Button>
              )}
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="installation">
                <AccordionTrigger>Installation Guide</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal ml-5 space-y-2">
                    {installationSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="compatibility">
                <AccordionTrigger>Compatibility</AccordionTrigger>
                <AccordionContent>
                  <p>This product is compatible with Counter-Strike 1.6 (build 7960-8684). Compatible with both Steam and Non-Steam versions. May require admin privileges to install.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="security">
                <AccordionTrigger>Security & VAC Safety</AccordionTrigger>
                <AccordionContent>
                  <p>All our products are designed to be undetectable by VAC and other anti-cheat systems. However, we recommend using these products on community servers or with VAC disabled for the safest experience.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-card p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{review.author}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          size={14} 
                          className={index < review.rating ? "fill-gaming-400 text-gaming-400" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button variant="outline" className="w-full">Load More Reviews</Button>
          </div>
        </section>
      </div>
      
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-0 right-0 -mt-12" 
              onClick={() => setShowVideoModal(false)}
            >
              <X size={24} />
            </Button>
            <div className="aspect-video">
              <iframe 
                src={product.videoUrl ? product.videoUrl.replace('watch?v=', 'embed/') : ''} 
                title={product.name} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
