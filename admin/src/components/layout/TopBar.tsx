
import { useState } from 'react';
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { adminUser } from '@/lib/data';

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
      {/* Search */}
      <div className="relative w-64 hidden md:block">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="search"
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Search..."
        />
      </div>
      
      {/* Mobile search icon */}
      <button className="p-2 rounded-full hover:bg-gray-100 md:hidden">
        <Search className="h-5 w-5 text-gray-500" />
      </button>

      {/* Right section: notifications and profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-gray-500 mt-1">John ordered a cappuccino 5 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                    <p className="text-sm font-medium">Low stock alert</p>
                    <p className="text-xs text-gray-500 mt-1">Espresso beans are running low</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Sales report available</p>
                    <p className="text-xs text-gray-500 mt-1">Your weekly sales report is ready to view</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <a href="#" className="text-xs text-primary hover:text-primary/80 font-medium">View all notifications</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                <img 
                  src={adminUser.avatar} 
                  alt={adminUser.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden md:block">{adminUser.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">
              {adminUser.name}
              <p className="text-xs text-gray-500 font-normal mt-0.5">{adminUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default TopBar;
