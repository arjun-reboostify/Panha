import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  Menu, 
  X, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { noterAuth } from "../../firebase";

interface MenuItem {
  label: string;
  path: string;
  emoji: string;
}

const menuItems: MenuItem[] = [
  { label: 'Reddit', path: '/', emoji: '💬' },

];

const CompactResponsiveSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Fullscreen toggle function
  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          (document.documentElement as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle error", err);
    }
  };

  // Keyboard and outside click handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current && 
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Main Menu Toggle Button */}
      <motion.button
        ref={toggleButtonRef}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: isSidebarOpen ? 90 : 0,
          transition: { duration: 0.3 }
        }}
        className="fixed right-0 top-0
                   bg-black/80 text-white p-3 rounded-full z-[100] 
                   shadow-lg hover:bg-black/90 transition-all"
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Blur Background Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 
                       bg-black/90 backdrop-blur-lg z-[60] 
                       shadow-2xl rounded-l-xl flex flex-col 
                       touch-pan-y"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8 object-contain"
                  src="/notes.svg"
                  alt="logo"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                  bg-clip-text text-transparent">
                  Panha
                </h1>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-yellow-100/20 hover:bg-yellow-100/40 
                             rounded-full transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              </div>
            </div>

            {/* Scrollable Menu */}
            <nav className="flex-1 overflow-y-auto scrollbar-thin 
                            scrollbar-thumb-gray-700 scrollbar-track-transparent
                            touch-pan-y">
              <ul className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative touch-manipulation"
                  >
                    <a
                      href={item.path}
                      className="flex items-center gap-3 p-2.5 rounded-lg 
                                 text-gray-300 hover:text-white 
                                 hover:bg-white/10 transition-all"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 space-y-2">
              <button
                onClick={() => noterAuth.signOut()}
                className="w-full flex items-center justify-center gap-2 p-2.5 
                           text-gray-300 hover:text-white hover:bg-white/10 
                           rounded-lg transition-colors touch-manipulation"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompactResponsiveSidebar;