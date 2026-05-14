import React from 'react';
import { motion } from 'motion/react';
import { Home as HomeIcon, User, Code, Share2, Orbit, Box } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'bios', label: 'Bios', icon: User },
    { id: 'system', label: 'System', icon: Orbit },
    { id: 'system3d', label: '3D System', icon: Box },
    { id: 'projects', label: 'Projects', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4 md:p-8 font-sans">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-60 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1766329710745-21f110fa2d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcnN0ZWxsYXIlMjBzcGFjZSUyMG5lYnVsYSUyMHN0YXJzfGVufDF8fHx8MTc3MDIzOTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080")' }}
      />
      
      {/* Animated Stars Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Landscape Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[1200px] min-h-[85vh] bg-black/40 backdrop-blur-md border-[12px] border-blue-950 rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Navigation Header */}
        <header className="p-6 border-b border-blue-900/50 flex justify-between items-center">
          <h1 className="text-blue-400 font-bold tracking-widest text-lg uppercase">Nexus Core</h1>
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-full transition-all ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-blue-300 hover:bg-blue-900/30'
                }`}
              >
                <tab.icon size={20} />
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 border-t border-blue-900/30 text-center">
          <p className="text-blue-500/50 text-[10px] uppercase tracking-tighter">System Version 4.2.0 | Encrypted Connection Stable</p>
        </footer>
      </motion.div>
    </div>
  );
};