
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Plus, Minus, ShoppingBag, ChevronLeft, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useStore();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // This would typically redirect to a checkout page
    // For now, we'll just show an alert
    alert('Checkout functionality will be implemented in the next phase!');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="bg-card rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => navigate('/catalog')}>
              Browse Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-muted-foreground" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                      <div className="col-span-6 flex gap-4">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link to={`/product/${item.product.id}`} className="hover:text-gaming-400">
                              {item.product.name}
                            </Link>
                          </h3>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.product.category}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-red-500 hover:text-red-600 p-0 h-auto mt-1"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash size={14} className="mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-center">
                        ${item.product.price.toFixed(2)}
                      </div>
                      
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-right font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-600"
                  onClick={clearCart}
                >
                  <Trash size={16} className="mr-1" /> Clear Cart
                </Button>
                <Link to="/catalog">
                  <Button variant="outline" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-4">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(subtotal * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-3 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(subtotal + (subtotal * 0.1)).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
              
              <Button 
                className="w-full py-6 bg-gaming-600 hover:bg-gaming-500" 
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="mt-4 text-xs text-muted-foreground text-center">
                Secure checkout with Stripe. We do not store your payment information.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
