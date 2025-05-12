
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tags: string[];
  fullDescription?: string;
  installationSteps?: string[];
  isFeatured?: boolean;
  videoUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

// Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Mock products data
const mockProducts: Product[] = [
  {
    id: "cfg-001",
    name: "Pro Player CFG - f0rest Edition",
    price: 4.99,
    description: "Premium CFG used by f0rest, optimized for best visibility and accuracy.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXJ8ZW58MHx8MHx8fDA%3D",
    category: "CFGs",
    tags: ["Pro Player", "Optimized", "Competitive"],
    fullDescription: "This configuration file was created based on settings used by the legendary CS 1.6 player Patrik 'f0rest' Lindberg. It offers perfect sensitivity settings, optimized rates for modern connections, and tweaked video settings for maximum visibility. This config focuses on providing the best competitive advantage while maintaining the classic CS 1.6 feel.",
    installationSteps: [
      "Download the file", 
      "Extract to your Counter-Strike directory", 
      "Replace your existing config.cfg", 
      "Launch the game with '-exec config.cfg'"
    ],
    isFeatured: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "dll-001",
    name: "FPS Booster Ultimate",
    price: 9.99,
    description: "Increase your FPS by up to 200% on any hardware with this optimization DLL.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWVyfGVufDB8fDB8fHww",
    category: "DLLs",
    tags: ["FPS Boost", "Performance", "Legal", "VAC-Safe"],
    isFeatured: true
  },
  {
    id: "reg-001",
    name: "Net Optimization Pack",
    price: 3.99,
    description: "Registry tweaks to optimize your network settings for the lowest possible ping.",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdhbWVyfGVufDB8fDB8fHww",
    category: "REGs",
    tags: ["Network", "Low Ping", "Latency Fix"]
  },
  {
    id: "script-001",
    name: "AutoHotkey Pro Scripts Bundle",
    price: 6.99,
    description: "Collection of AutoHotkey scripts for enhanced gameplay and rapid weapon switching.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nJTIwZ2FtZXJ8ZW58MHx8MHx8fDA%3D",
    category: "Scripts",
    tags: ["AHK", "Weapon Switch", "Macros", "Efficiency"]
  },
  {
    id: "cfg-002",
    name: "HeadHunter Aim CFG",
    price: 2.99,
    description: "Precision-focused config optimized for headshot accuracy and spray control.",
    image: "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbWVyJTIwZnBzfGVufDB8fDB8fHww",
    category: "CFGs",
    tags: ["Aim", "Headshot", "Precision"]
  },
  {
    id: "dll-002",
    name: "SoundHawk Audio Enhancer",
    price: 7.99,
    description: "Enhance footstep sounds and directional audio for superior opponent detection.",
    image: "https://images.unsplash.com/photo-1605224394149-7c827e17d442?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGdhbWVyJTIwYXVkaW98ZW58MHx8MHx8fDA%3D",
    category: "DLLs",
    tags: ["Audio", "Footsteps", "Directional Sound", "Legal"],
    isFeatured: true
  },
  {
    id: "reg-002",
    name: "Input Lag Eliminator",
    price: 0,
    description: "FREE registry tweaks to reduce mouse and keyboard input lag by up to 40%.",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdhbWVyJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
    category: "REGs",
    tags: ["Input Lag", "Free", "Mouse", "Keyboard"]
  },
  {
    id: "bundle-001",
    name: "Pro Gamer Complete Pack",
    price: 19.99,
    description: "Ultimate bundle including our best CFGs, DLLs, REG tweaks and scripts at 40% off.",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGdhbWVyJTIwc2V0dXB8ZW58MHx8MHx8fDA%3D",
    category: "Bundles",
    tags: ["Bundle", "Discount", "Complete Pack"],
    isFeatured: true
  }
];

// Provider component
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.product.id === productId);
      
      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, quantity: 1 }];
      }
    });

    toast.success(`Added ${product.name} to your cart`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook to use the context
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
