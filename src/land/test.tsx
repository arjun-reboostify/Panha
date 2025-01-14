import React, { useState, useRef, useEffect } from 'react'; 
import { 
  Home, 
  Book, 
  Users, 
  Settings, 
  ChartBar, 
  Mail, 
  Calendar, 
  Shield, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Type refs to HTMLDivElement and HTMLButtonElement
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { icon: Home, path: '/form', label: 'Form' },
    { icon: Book, path: '/login', label: 'Login' },
    { icon: Users, path: '/register', label: 'Signup' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the menu and button
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) && 
        mobileMenuButtonRef.current && 
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-transparent z-50 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <img 
                  src="/logo.jpg"
                  className="h-10 m-5 w-10"
                /> 
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600  m-5
                bg-clip-text text-transparent">
                  Panha
                </h1>
              </motion.div>
            </div>

            {/* Navigation Items */}
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 300 
                  }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-blue-600 
                               transition-colors duration-300 
                               flex items-center space-x-2 
                               px-3 py-2 rounded-lg 
                               hover:bg-blue-50"
                  >
                    <item.icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
          className="fixed top-1 right-1 bg-white text-blue-500 p-2 rounded-full shadow-lg z-50"
          ref={mobileMenuButtonRef} // Add ref to the button
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
 
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-0 left-0 h-[5vh] justify-center items-center w-full bg-transparent flex gap-4 shadow-lg z-45 md:block"
          
        >
          <img 
            src="/logo.jpg"
            className="h-5 w-5"
          /> 
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600  
          bg-clip-text text-transparent">
            Panha
          </h1>
        </motion.div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
            style={{
              background: `url('/bg.jpg') no-repeat center center fixed`,
              backgroundSize: 'cover',
              contain: 'layout paint',
              clipPath: 'inset(0)'
            }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40"
              ref={mobileMenuRef} // Add ref to the menu
            >
              <div className="flex flex-col mt-16 space-y-2 px-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      type: "spring", 
                      stiffness: 300 
                      
                    }}
               
                  >
                    <Link 
                      to={item.path} 
                      onClick={toggleMobileMenu}
                      className="flex items-center space-x-3 
                                 px-4 py-3 rounded-lg 
                                 hover:bg-blue-50 
                                 transition-colors duration-300"
                    >
                      <item.icon size={20} className="text-gray-600" />
                      <span className="text-gray-800">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavBar;
