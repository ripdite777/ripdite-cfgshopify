
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = ({ cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gaming-400 text-glow">CS 1.6 PRO</span>
              <span className="ml-1 text-xs uppercase tracking-widest text-muted-foreground mt-1">Store</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/catalog" className="text-sm font-medium hover:text-gaming-400 transition-colors">
                Browse
              </Link>
              <Link to="/catalog?category=configs" className="text-sm font-medium hover:text-gaming-400 transition-colors">
                CFGs
              </Link>
              <Link to="/catalog?category=dlls" className="text-sm font-medium hover:text-gaming-400 transition-colors">
                DLLs
              </Link>
              <Link to="/catalog?category=regs" className="text-sm font-medium hover:text-gaming-400 transition-colors">
                REG Tweaks
              </Link>
              <Link to="/catalog?category=scripts" className="text-sm font-medium hover:text-gaming-400 transition-colors">
                Scripts
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search size={20} />
            </Button>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-green text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-background z-40 md:hidden transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/catalog" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            Browse All
          </Link>
          <Link to="/catalog?category=configs" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            CFGs
          </Link>
          <Link to="/catalog?category=dlls" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            DLLs
          </Link>
          <Link to="/catalog?category=regs" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            REG Tweaks
          </Link>
          <Link to="/catalog?category=scripts" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            Scripts
          </Link>
          <Link to="/login" className="p-2 text-foreground hover:bg-secondary rounded-md" onClick={toggleMenu}>
            Login / Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
