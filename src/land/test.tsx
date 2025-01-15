import React, { useState, useRef, useEffect } from 'react';
import { UserCheck,User2Icon,WorkflowIcon,Info, Menu, X, Home,ChevronUp,ChevronDown, Phone,BookA,Lock,CircleArrowOutDownRightIcon,HelpCircleIcon ,Contact} from 'lucide-react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Mobile Toggle Menu Items
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

  // Top Navigation Items
  const topNavItems: NavItem[] = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Info, path: '/', label: 'About' },
    { icon: WorkflowIcon, path: '/', label: 'Our Service' },
  ];

  // Desktop Toggle Menu Items
  const desktopToggleItems: NavItem[] = [
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


  const springAnimation = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavigationItems: React.FC<NavigationItemsProps> = ({ items, mobile = false, onItemClick }) => (
    <>
      {items.map((item, index) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, ...springAnimation }}
        >
          <Link
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 ${
              mobile ? 'text-gray-800' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <item.icon size={20} className={mobile ? 'text-gray-600' : ''} />
            <span className={mobile ? '' : 'text-sm'}>{item.label}</span>
          </Link>
        </motion.div>
      ))}
    </>
  );

  const MenuButton = ({ isMobile = false }) => (
    <motion.button
      onClick={() => isMobile ? setIsMobileMenuOpen(!isMobileMenuOpen) : setIsDesktopMenuOpen(!isDesktopMenuOpen)}
      whileTap={{ scale: 0.9 }}
      className={`bg-white text-blue-500 p-2 rounded-full shadow-lg z-50 
        fixed top-1 right-1 `}
      ref={menuButtonRef}
    >
      {(isMobile ? isMobileMenuOpen : isDesktopMenuOpen) ? (
        <X size={24} />
      ) : (
        <Menu size={24} />
      )}
    </motion.button>
  );

  const SideMenu = ({ isMobile = false }) => {
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

    const scrollTo = (direction: 'up' | 'down') => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = direction === 'up' ? -300 : 300;
        container.scrollTo({
          top: container.scrollTop + scrollAmount,
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <AnimatePresence>
        {(isMobile ? isMobileMenuOpen : isDesktopMenuOpen) && (
          <motion.div
            style={{
              background: `url('/bg.jpg') no-repeat center center fixed`,
              backgroundSize: 'cover',
              contain: 'layout paint',
              clipPath: 'inset(0)'
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={springAnimation}
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 ${
              isMobile ? 'md:hidden' : 'hidden md:block'
            }`}
            ref={menuRef}
          >
            {/* Main Container */}
            <div className="relative h-full flex flex-col">
              {/* Scrollable Content */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto scrollbar-hide"
                style={{ maxHeight: 'calc(100vh - 64px)' }} // Adjust based on your buttons' height
              >
                <div className="mt-16 px-4 space-y-2">
                  <NavigationItems 
                    items={isMobile ? mobileToggleItems : desktopToggleItems}
                    mobile 
                    onItemClick={() => isMobile ? setIsMobileMenuOpen(false) : setIsDesktopMenuOpen(false)} 
                  />
                  
                  
                    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg mt-4 mb-4">
                      <div className="flex justify-center font-bold gap-4">
                        <ActionButton href="/call" label="Call">
                          <Callicon />
                        </ActionButton>
                        <ActionButton href="/chat" label="Bot">
                          <WhatsAppIcon />
                        </ActionButton>
                      </div>
                    </div>
              
                </div>
              </div>
  
              {/* Scroll Buttons - Fixed at bottom */}
              <div className="sticky bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-white border-t border-gray-200 z-10">
                <button
                  onClick={() => scrollTo('up')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:bg-gray-200"
                >
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollTo('down')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:bg-gray-200"
                >
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  const Logo = ({ className = "" }: { className?: string }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-3 ${className}`}
    >
      <img src="/logo.jpg" className="h-10 w-10" alt="Logo" />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Panha
      </h1>
    </motion.div>
  );
  const ActionButton: React.FC<ActionButtonProps> = ({ href, label, children }) => (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-4 border rounded-lg bg-white hover:bg-gray-200 transition-all flex-1 max-w-[200px] w-full"
    >
      {children}
      <span className="text-xl p-2 text-gray-700">{label}</span>
    </a>
  );

  const WhatsAppIcon = () => (
    <svg
      fill="#11bb25"
      viewBox="0 0 308 308"
      className="w-12 h-12"
    >
      <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z" />
      <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z" />
    </svg>
  );
  const Callicon = () => (
    <svg 
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#1470a9"
 
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
      fill="#2ef5f2"
    ></path>
  </g>
</svg>

  );
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <MenuButton isMobile />
        <SideMenu isMobile />
        <MenuButton />
        <SideMenu />
      </div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-transparent z-40 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo className="m-5" />
            <div className="flex space-x-4">
              <NavigationItems 
                items={topNavItems}
                onItemClick={() => {}} 
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Logo */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-0 left-0 h-[5vh] justify-center items-center w-full bg-transparent flex gap-4 shadow-lg z-45 md:hidden"
      >
        <img src="/logo.jpg" className="h-5 w-5" alt="Logo" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Panha
        </h1>
      </motion.div>
    </>
  );
};

export default NavBar;