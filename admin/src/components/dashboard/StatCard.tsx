
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-xl overflow-hidden border border-gray-100", 
        "p-6 flex items-start justify-between",
        "transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold">{value}</p>
          <span className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded-full",
            trend === 'up' && "text-green-700 bg-green-50",
            trend === 'down' && "text-red-700 bg-red-50",
            trend === 'neutral' && "text-gray-700 bg-gray-50"
          )}>
            {change}
          </span>
        </div>
      </div>
      
      <div className={cn(
        "p-3 rounded-lg transition-colors duration-300",
        "bg-primary/5 text-primary"
      )}>
        <motion.div
          animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StatCard;
