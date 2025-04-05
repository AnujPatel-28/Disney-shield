
import { ContentAnalyzer } from '../components/Analyze/ContentAnalyzer';
import { motion } from 'framer-motion';

const Analyze = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Content Analysis</h1>
        <p className="text-muted-foreground">
          Detect potential Disney IP violations with our advanced AI
        </p>
      </motion.div>

      <ContentAnalyzer />
    </div>
  );
};

export default Analyze;
