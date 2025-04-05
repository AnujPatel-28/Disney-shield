
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Login successful:", result.user.displayName);
      toast.success("Successfully logged in!");
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-magic">
      <div className="absolute inset-0 bg-[url('/assets/castle-bg.png')] bg-cover bg-center opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center z-10 p-8 md:p-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="mb-6"
        >
          <Shield className="w-16 h-16 text-disney-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-2 text-center"
        >
          DisneyShield<span className="text-disney-gold">.AI</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/80 text-center mb-8"
        >
          Advanced IP Protection Powered by AI
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="bg-white text-disney-blue hover:bg-disney-gold hover:text-disney-dark px-6 py-5 text-lg font-medium flex items-center gap-2 rounded-lg transition-all duration-300"
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-disney-blue border-t-transparent rounded-full" />
            ) : (
              <>
                <Lock className="w-5 h-5" /> 
                Sign in with Google
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-white/70 text-sm"
      >
        © 2025 DisneyShield.AI. All rights reserved.
      </motion.div>
    </div>
  );
};

export default LoginPage;
