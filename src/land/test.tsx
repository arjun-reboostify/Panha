import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, User2Icon, WorkflowIcon, Info, Menu, X, Home, ChevronUp, ChevronDown, Phone, BookA, Lock, CircleArrowOutDownRightIcon, HelpCircleIcon, Contact,ChevronLeft,ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  icon: React.ElementType;
  path: string;
  label: string;
}

interface NavigationItemsProps {
  items: NavItem[];
  mobile?: boolean;
  onItemClick?: () => void;
}

interface ActionButtonProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Navigation Items
  const mobileToggleItems: NavItem[] = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Info, path: '/', label: 'About' },
    { icon: WorkflowIcon, path: '/', label: 'Our Service' },
    { icon: User2Icon, path: '/', label: 'Our Team' },
    { icon: UserCheck, path: '/', label: 'Experts' },
    { icon: Phone, path: '/', label: 'Request a Call' },
    { icon: BookA, path: '/', label: 'Resources' },
    { icon: Lock, path: '/', label: 'Data Security' },
    { icon: HelpCircleIcon, path: '/', label: 'Help' },
    { icon: Contact, path: '/', label: 'Contact Us' },
    { icon: CircleArrowOutDownRightIcon, path: '/', label: 'Terms and Conditions' },
  ];

  const topNavItems: NavItem[] = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Info, path: '/', label: 'About' },
    { icon: WorkflowIcon, path: '/', label: 'Our Service' },
  ];

  const desktopToggleItems: NavItem[] = mobileToggleItems.slice(3);

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      pointerEvents: "auto" as const
    },
    closed: {
      opacity: 0,
      pointerEvents: "none" as const
    }
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
      }
    };

    // Handle escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
      }
    };

    // Handle body scroll
    if (isMobileMenuOpen || isDesktopMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isDesktopMenuOpen]);

  const NavigationItems: React.FC<NavigationItemsProps> = ({ items, mobile = false, onItemClick }) => (
    <>
      {items.map((item, index) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="w-full"
        >
          <Link
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 w-full
              ${mobile ? 'text-gray-800' : 'text-gray-600 hover:text-blue-600'}`}
          >
            <item.icon size={20} className={mobile ? 'text-gray-600' : ''} />
            <span className={`${mobile ? 'text-base' : 'text-sm'} whitespace-nowrap`}>{item.label}</span>
          </Link>
        </motion.div>
      ))}
    </>
  );

  const SideMenu = ({ isMobile = false }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll right
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Scroll 200px to the right
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  // Scroll left
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Scroll 200px to the left
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };
    const isOpen = isMobile ? isMobileMenuOpen : isDesktopMenuOpen;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
    const preventScroll = (e: WheelEvent) => {
      const target = e.target as Node;
      if (scrollContainer?.contains(target)) {
        e.preventDefault();
        scrollContainer.scrollTop += e.deltaY;
      }
    };

    // Add event listener with passive: false to allow preventDefault()
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
    };
  }, []);
    const handleScroll = (direction: 'up' | 'down') => {
      if (scrollContainerRef.current) {
        const scrollAmount = direction === 'up' ? -200 : 200;
        scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              ref={overlayRef}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => isMobile ? setIsMobileMenuOpen(false) : setIsDesktopMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col
                ${isMobile ? 'md:hidden' : 'hidden md:flex'}`}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={() => isMobile ? setIsMobileMenuOpen(false) : setIsDesktopMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Scrollable content */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide"
              >
                <div className="p-4 space-y-2">
                  <NavigationItems
                    items={isMobile ? mobileToggleItems : desktopToggleItems}
                    mobile
                    onItemClick={() => isMobile ? setIsMobileMenuOpen(false) : setIsDesktopMenuOpen(false)}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 border-t border-gray-200">
      {/* Scrollable Content */}
      <div
        className="flex justify-start space-x-1 overflow-x-auto whitespace-nowrap"
        ref={scrollRef}
      >
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/call" label="Call">
          <CallIcon />
        </ActionButton>
        <ActionButton href="/chat" label="Chat">
          <WhatsAppIcon />
        </ActionButton>
      </div>

      {/* Scroll Buttons */}
      <div className="flex justify-between mt-2">
        {/* Left Scroll Button */}
        <button
          onClick={handleScrollLeft}
          className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 p-2 rounded"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={handleScrollRight}
          className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 p-2 rounded"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
              {/* Scroll buttons */}
              <div className="absolute bottom-40 right-4 flex flex-col space-y-2">
                <button
                  onClick={() => handleScroll('up')}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                  <ChevronUp size={20} />
                </button>
                <button
                  onClick={() => handleScroll('down')}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const Logo = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-3"
    >
      <img src="/logo.jpg" className="h-10 w-10 rounded-full" alt="Logo" />
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Panha
      </h1>
    </motion.div>
  );

  return (
    <>
      {/* Main navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            {/* Desktop menu items */}
            <div className="hidden md:flex items-center space-x-4">
              <NavigationItems items={topNavItems} />
              <button
                ref={menuButtonRef}
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Side menus */}
      <SideMenu isMobile />
      <SideMenu />
    </>
  );
};

// Icon components
// Previous code remains the same until WhatsAppIcon...

const WhatsAppIcon = () => (
  <svg viewBox="0 0 308 308" className="w-8 h-8 fill-green-500">
    <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z" />
    <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z" />
  </svg>
);

const CallIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-8 h-8"
    fill="none"
    stroke="#1470a9"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ActionButton: React.FC<ActionButtonProps> = ({ href, label, children }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md"
  >
    {children}
    <span className="text-sm font-medium text-gray-700 mt-1">{label}</span>
  </motion.a>
);

export default NavBar;