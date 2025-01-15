import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white h-[30vh] w-full">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-4 gap-8 h-full items-center overflow-hidden">
          {/* Column 1 - Logo */}
          <div className="flex items-center lg:h-40 lg:w-40 sm:h-20 sm:w-20 md:h-20 md:w-20">
           <img src="/logo.jpg" alt="" />
          </div>

          {/* Column 2 - First Links Column */}
          <div className="flex flex-col space-y-4">
            <a href="/about" className="hover:text-gray-300 transition-colors">
              About Us
            </a>
            <a href="/services" className="hover:text-gray-300 transition-colors">
              Services
            </a>
            <a href="/products" className="hover:text-gray-300 transition-colors">
              Products
            </a>
          </div>

          {/* Column 3 - Second Links Column */}
          <div className="flex flex-col space-y-4">
            <a href="/careers" className="hover:text-gray-300 transition-colors">
              Careers
            </a>
            <a href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </a>
            <a href="/blog" className="hover:text-gray-300 transition-colors">
              Blog
            </a>
          </div>

          {/* Column 4 - Scroll to Top Button */}
          <div className="flex justify-center">
            <button
              onClick={scrollToTop}
              className="bg-white text-black p-4 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;