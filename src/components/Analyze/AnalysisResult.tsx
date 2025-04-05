
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, ShieldAlert, RefreshCcw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisResultProps {
  result: {
    url: string;
    risk: 'low' | 'medium' | 'high';
    confidence: number;
    category: string;
    action: string;
    details: string;
  };
  onReset: () => void;
}

export function AnalysisResult({ result, onReset }: AnalysisResultProps) {
  const getRiskIcon = () => {
    switch (result.risk) {
      case 'high':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'medium':
        return <ShieldAlert className="h-8 w-8 text-amber-500" />;
      case 'low':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      default:
        return null;
    }
  };

  const getRiskColor = () => {
    switch (result.risk) {
      case 'high':
        return 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400';
      case 'low':
        return 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border">
          {getRiskIcon()}
        </div>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            {result.risk.charAt(0).toUpperCase() + result.risk.slice(1)} Risk
            <Badge className={`ml-2 ${result.risk === 'high' ? 'bg-red-500' : result.risk === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}>
              {result.confidence}% Confidence
            </Badge>
          </h3>
          <p className="text-muted-foreground">{result.category}</p>
        </div>
      </div>

      <div className={`p-4 rounded-md border ${getRiskColor()}`}>
        <h4 className="font-medium mb-1">Recommended Action</h4>
        <p>{result.action}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Analysis Details</h4>
        <p className="text-muted-foreground">{result.details}</p>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="font-medium mb-1">Analyzed Content</h4>
        <p className="text-sm text-muted-foreground mb-1">URL:</p>
        <div className="p-2 bg-muted rounded text-sm break-all">
          {result.url}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          New Analysis
        </Button>
        {result.risk !== 'low' && (
          <Button className="bg-disney-purple hover:bg-disney-purple/90 text-white flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate DMCA Notice
          </Button>
        )}
      </div>
    </motion.div>
  );
}
