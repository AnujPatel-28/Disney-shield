
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DmcaResultProps {
  result: {
    infringingUrl: string;
    ipDescription: string;
    ownerName: string;
    ownerEmail: string;
    letterContent: string;
    timestamp: string;
  };
  onReset: () => void;
}

export function DmcaResult({ result, onReset }: DmcaResultProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result.letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.letterContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dmca-notice-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="mx-auto mb-4"
        >
          <FileText className="h-12 w-12 text-disney-gold mx-auto" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">DMCA Notice Generated</h3>
        <p className="text-muted-foreground">Your legal takedown notice is ready for use</p>
      </div>

      <div className="overflow-auto p-4 bg-muted rounded-md border border-border max-h-[400px]">
        <pre className="whitespace-pre-wrap font-mono text-sm">{result.letterContent}</pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          New Notice
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button onClick={handleDownload} className="bg-disney-purple hover:bg-disney-purple/90 text-white flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download as Text
        </Button>
      </div>
    </motion.div>
  );
}

import { FileText } from 'lucide-react';
