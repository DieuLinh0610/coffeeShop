
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { dashboardNavItems } from '@/lib/data';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div 
      initial={{ width: 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      className={cn(
        "h-screen fixed left-0 top-0 z-20 bg-white border-r border-gray-200",
        "flex flex-col transition-all duration-300 ease-in-out",
        "shadow-soft"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Coffee Admin</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {collapsed && <Coffee className="h-6 w-6 text-primary mx-auto" />}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {dashboardNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-gray-100 group",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-gray-600"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all",
                  collapsed ? "mx-auto" : ""
                )} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-500 text-center"
            >
              Coffee Shop Admin v1.0
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Sidebar;
