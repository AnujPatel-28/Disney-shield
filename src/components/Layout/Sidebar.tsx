
import { NavLink } from 'react-router-dom';
import { Shield, Home, Search, FileText, LogOut, X } from 'lucide-react';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Analyze', path: '/analyze', icon: <Search className="w-5 h-5" /> },
    { name: 'DMCA', path: '/dmca', icon: <FileText className="w-5 h-5" /> },
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="h-full flex flex-col p-4">
      {isMobile && (
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-sidebar-foreground p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-3 px-2 py-4">
        <Shield className="w-8 h-8 text-disney-gold" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-sidebar-foreground">DisneyShield<span className="text-disney-gold">.AI</span></h1>
          <p className="text-xs text-sidebar-foreground/70">IP Protection Platform</p>
        </div>
      </div>

      <div className="h-px bg-sidebar-border my-4"></div>

      <motion.nav className="flex-1 mt-6" variants={listVariants} initial="hidden" animate="show">
        <motion.div className="flex flex-col gap-2" variants={listVariants} initial="hidden" animate="show">
          {navItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <NavLink
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </motion.nav>

      <div className="h-px bg-sidebar-border my-4"></div>

      <motion.div variants={itemVariants}>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
