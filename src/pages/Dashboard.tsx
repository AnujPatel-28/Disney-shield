
import { MetricCard } from '../components/Dashboard/MetricCard';
import { RecentAlerts } from '../components/Dashboard/RecentAlerts';
import { Shield, FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // Mock data for recent alerts
  const recentAlerts = [
    {
      id: '1',
      link: 'https://example.com/unauthorized-mickey',
      riskLevel: 'high' as 'high',
      category: 'Character Usage',
      status: 'new' as 'new',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: '2',
      link: 'https://video-platform.com/frozen-full-movie',
      riskLevel: 'high' as 'high',
      category: 'Video Piracy',
      status: 'reviewing' as 'reviewing',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      id: '3',
      link: 'https://artwork.com/disney-inspired',
      riskLevel: 'medium' as 'medium',
      category: 'Artwork',
      status: 'new' as 'new',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    },
    {
      id: '4',
      link: 'https://store.example.com/disney-items',
      riskLevel: 'low' as 'low',
      category: 'Merchandise',
      status: 'resolved' as 'resolved',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage IP protection activity</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Active Alerts" 
          value="12" 
          description="+3 from last week" 
          icon={Shield}
          color="text-red-500"
          delay={0.1}
        />
        <MetricCard 
          title="DMCA Requests" 
          value="28" 
          description="7 pending actions" 
          icon={FileText}
          color="text-blue-500"
          delay={0.2}
        />
        <MetricCard 
          title="AI Scans" 
          value="143" 
          description="Last scan: 10 minutes ago" 
          icon={Search}
          color="text-disney-purple"
          delay={0.3}
        />
      </div>

      <RecentAlerts alerts={recentAlerts} />
    </div>
  );
};

export default Dashboard;
