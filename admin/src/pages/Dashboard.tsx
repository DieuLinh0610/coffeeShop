
import { motion } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PageTransition from '@/components/ui/PageTransition';
import { statistics } from '@/lib/data';

const Dashboard = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <StatCard 
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend as 'up' | 'down' | 'neutral'}
              icon={stat.icon}
            />
          ))}
        </div>
        
        {/* Revenue Chart */}
        <RevenueChart />
        
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-100 shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Cappuccino</p>
                    <p className="text-xs text-gray-500">482 sales</p>
                  </div>
                </div>
                <span className="font-medium">$4.50</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Espresso</p>
                    <p className="text-xs text-gray-500">367 sales</p>
                  </div>
                </div>
                <span className="font-medium">$3.50</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Chocolate Cake</p>
                    <p className="text-xs text-gray-500">291 sales</p>
                  </div>
                </div>
                <span className="font-medium">$5.25</span>
              </div>
            </div>
          </motion.div>
          
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-100 shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Order #1238</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Order #1237</p>
                  <p className="text-xs text-gray-500">12 minutes ago</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">In Progress</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Order #1236</p>
                  <p className="text-xs text-gray-500">24 minutes ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
