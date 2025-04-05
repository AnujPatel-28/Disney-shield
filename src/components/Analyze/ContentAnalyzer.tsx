
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalysisResult } from './AnalysisResult';

// Mock function to simulate API call to Firebase Function
const analyzeContent = async (url: string, description: string) => {
  // In a real app, this would call a Firebase Function
  console.log('Analyzing content:', { url, description });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response
  return {
    url,
    risk: Math.random() > 0.5 ? 'high' : (Math.random() > 0.5 ? 'medium' : 'low'),
    confidence: Math.floor(Math.random() * 30 + 70),
    category: Math.random() > 0.5 ? 'Unauthorized Character Usage' : 'Video Piracy',
    action: 'DMCA Takedown Recommended',
    details: 'The analysis detected Disney intellectual property being used without authorization. The content appears to contain copyrighted characters and scenes that match our database of protected IP.',
  };
};

export function ContentAnalyzer() {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const analysisResult = await analyzeContent(url, description);
      setResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    setDescription('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-magic card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-disney-purple" />
              Content Analysis
            </CardTitle>
            <CardDescription>
              Analyze content for potential Disney IP violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <AnalysisResult result={result} onReset={handleReset} />
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium mb-1">
                    Content URL <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="url"
                    placeholder="https://example.com/content"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description (optional)
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe the suspected content violation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    className="min-h-[100px]"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={loading}>
              View History
            </Button>
            {!result && (
              <Button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="bg-disney-purple hover:bg-disney-purple/90 text-white"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze with AI <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
