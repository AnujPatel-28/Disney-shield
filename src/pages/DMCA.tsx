
import { DmcaGenerator } from '../components/DMCA/DmcaGenerator';
import { motion } from 'framer-motion';

const DMCA = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">DMCA Notice Generator</h1>
        <p className="text-muted-foreground">
          Create legally formatted takedown notices for copyright violations
        </p>
      </motion.div>

      <DmcaGenerator />
    </div>
  );
};

export default DMCA;
