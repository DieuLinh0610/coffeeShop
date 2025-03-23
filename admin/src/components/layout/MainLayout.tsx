
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300 ease-in-out">
        <TopBar />
        
        <main className="p-6">
          <AnimatePresence mode="wait">
            <div key={location.pathname}>
              {children}
            </div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
