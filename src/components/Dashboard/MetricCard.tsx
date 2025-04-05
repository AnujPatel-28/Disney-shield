
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function MetricCard({ title, value, description, icon: Icon, color, delay = 0 }: MetricCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Card className="border-magic card-hover h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Icon className={`h-5 w-5 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          <CardDescription className="text-sm mt-2">{description}</CardDescription>
          <div className={`h-1 rounded-full mt-4 bg-gradient-to-r ${color.replace('text-', 'from-')} to-transparent`} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
