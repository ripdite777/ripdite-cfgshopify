
import React from 'react';
import { useLocation } from "react-router-dom";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-gaming-400 text-glow mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            The page you're looking for at <code className="bg-secondary px-2 py-1 rounded">{location.pathname}</code> doesn't exist or has been moved.
          </p>
          <Button className="bg-gaming-600 hover:bg-gaming-500" onClick={() => navigate('/')}>
            <Home size={16} className="mr-2" /> Return Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
