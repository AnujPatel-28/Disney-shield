
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthProvider';
import { Loader2 } from 'lucide-react';

// This page acts as a router that redirects based on authentication state
const Index = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    console.log('Index page loaded, redirecting to appropriate page');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-magic">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-disney-gold animate-spin" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if user is authenticated, otherwise to login
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
};

export default Index;
