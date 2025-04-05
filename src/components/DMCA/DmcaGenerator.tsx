
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DmcaResult } from './DmcaResult';

// Mock function to simulate API call to Firebase Function
const generateDmca = async (data: any) => {
  // In a real app, this would call a Firebase Function
  console.log('Generating DMCA with data:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response
  return {
    infringingUrl: data.infringingUrl,
    ipDescription: data.ipDescription,
    ownerName: data.ownerName,
    ownerEmail: data.ownerEmail,
    letterContent: `
DMCA TAKEDOWN NOTICE

Date: ${new Date().toLocaleDateString()}

Re: Copyright Infringement Notice

To Whom It May Concern:

This letter serves as notification under the Digital Millennium Copyright Act (17 USC § 512) that content currently residing at:

${data.infringingUrl}

is an unauthorized use of copyrighted material owned by The Walt Disney Company and/or its subsidiaries.

The original copyrighted material is: ${data.ipDescription}, owned and registered by The Walt Disney Company.

I have a good faith belief that the use of the described material in the manner complained of is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in the notification is accurate and that I am ${data.ownerName}, the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

Please contact me at ${data.ownerEmail} if you have any questions or require additional information.

Sincerely,

${data.ownerName}
Authorized Representative
The Walt Disney Company
`,
    timestamp: new Date().toISOString(),
  };
};

export function DmcaGenerator() {
  const [formData, setFormData] = useState({
    infringingUrl: '',
    ipDescription: '',
    ownerName: '',
    ownerEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    // Validation
    const requiredFields = ['infringingUrl', 'ipDescription', 'ownerName', 'ownerEmail'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      setError(`Please fill all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    if (!validateEmail(formData.ownerEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const dmcaResult = await generateDmca(formData);
      setResult(dmcaResult);
    } catch (err) {
      console.error('DMCA generation error:', err);
      setError('Failed to generate DMCA notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      infringingUrl: '',
      ipDescription: '',
      ownerName: '',
      ownerEmail: ''
    });
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
              <FileText className="h-5 w-5 text-disney-purple" />
              DMCA Notice Generator
            </CardTitle>
            <CardDescription>
              Generate a legal DMCA takedown notice for copyright infringement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <DmcaResult result={result} onReset={handleReset} />
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="infringingUrl" className="block text-sm font-medium mb-1">
                    Infringing Content URL <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="infringingUrl"
                    name="infringingUrl"
                    placeholder="https://example.com/infringing-content"
                    value={formData.infringingUrl}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="ipDescription" className="block text-sm font-medium mb-1">
                    IP Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="ipDescription"
                    name="ipDescription"
                    placeholder="Describe the intellectual property (e.g., 'Mickey Mouse animation from Fantasia')"
                    value={formData.ipDescription}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium mb-1">
                      Legal Owner Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="Your name or company name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerEmail" className="block text-sm font-medium mb-1">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="ownerEmail"
                      name="ownerEmail"
                      type="email"
                      placeholder="your-email@example.com"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
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
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-disney-purple hover:bg-disney-purple/90 text-white"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate DMCA <ChevronRight className="ml-2 h-4 w-4" />
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
