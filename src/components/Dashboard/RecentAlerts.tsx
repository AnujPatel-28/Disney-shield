
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type Alert = {
  id: string;
  link: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: string;
  status: 'new' | 'reviewing' | 'resolved';
  timestamp: Date;
};

interface RecentAlertsProps {
  alerts?: Alert[];
  loading?: boolean;
}

export function RecentAlerts({ alerts = [], loading = false }: RecentAlertsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case 'reviewing':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Reviewing</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <Card className="border-magic card-hover">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest detected content violations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className={`${getRiskColor(alert.riskLevel)} h-3 w-3 rounded-full mt-1.5`} />
                  <div className="flex flex-col space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{new URL(alert.link).hostname}</p>
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{alert.link}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{alert.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No alerts found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
