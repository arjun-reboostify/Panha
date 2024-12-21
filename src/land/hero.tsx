import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import D from './assets/215922841-holiday-travel-series-colorful-abstract-art-vector-image-of-car-road-trip.jpg'

const HeroSection: React.FC = () => {
  const [showHeading, setShowHeading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeading(false);
      setShowDescription(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (<><div className="h-[10vh] bg-gradient-to-br from-blue-50 to-blue-100 p-6 visibility-hidden"></div>

    <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col lg:flex-row items-center justify-center">
      {/* Left Section - Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 mb-8 lg:mb-0 lg:pr-12">
        {showHeading && (
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 
            animate-fade-in transform transition-all duration-700 
            hover:scale-105 cursor-pointer"
          >
            "Panha"
            <ArrowRight className="inline-block ml-3 text-blue-600 animate-bounce" />
          </h1>
        )}

        {showDescription && (
          <div className="animate-slide-up opacity-100 transform transition-all duration-700 ease-out">
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic text-gray-700 
            border-l-4 border-blue-500 pl-4">
              "Yaha bina judge kiye aapko sunna jayega and aapki problem solve hogi"
            </blockquote>
          </div>
        )}
      </div>

      {/* Yes/No Section */}
      {/* <div className="flex justify-center items-center w-full bg-gradient-to-br from-green-100 to-green-200 p-6 mb-8 lg:mb-0 rounded-lg">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Do you like Tailwind CSS?
          </h2>
          <div className="flex justify-center gap-4">
            <a
              href="/yes"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105"
            >
              Yes
            </a>
            <a
              href="/no"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white text-lg font-medium rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-transform transform hover:scale-105"
            >
              No
            </a>
          </div>
        </div>
      </div> */}

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-full max-h-[500px] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <img src='/logo.jpg' alt="Holiday Travel" className="w-full h-auto object-cover rounded-xl" />
        </div>
      </div>
    </div></>
  );
};

export default HeroSection;
