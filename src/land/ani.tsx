import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Layers, Zap, Database } from 'lucide-react';

const ScrollSectionAnimation = () => {
  const { scrollYProgress } = useViewportScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // Prevent the default scroll action
      const scrollSpeed = 0.8; // Slow down factor (0.5 = half the speed)
      const scrollAmount = event.deltaY * scrollSpeed; // Adjust scroll speed
      window.scrollBy(0, scrollAmount); // Move the page by the adjusted amount
    };

    // Listen for wheel event and apply the scroll slowdown
    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ultra-short animation range to trigger quickly
  const animationRange = isMobile ? [0, 0.009] : [0, 0.0001];

  // Quick-trigger transforms with early completion points
  const topLeftX = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [0, 750, isMobile ? 500 : 900]);
  const topLeftY = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [0, 250, isMobile ? 250 : 350]);
  const topLeftScale = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [1, 0.98, 1]);
  const topLeftRotate = useTransform(scrollYProgress, [0, animationRange[1]], [0, 0]);

  const topRightX = useTransform(scrollYProgress, [0, 0.08, animationRange[1]], [0, 500, isMobile ? 750 : 1000]);
  //const topRightRotate = useTransform(scrollYProgress, [0, animationRange[1]], [0, -5]);
  const topRightOpacity = useTransform(scrollYProgress, [0, 0.08, animationRange[1]], [1, 0.9, 1]);

  // Enhanced bottom left animations for dramatic entrance
  //const bottomLeftX = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [-200, 100, 0]);
  //const bottomLeftY = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [-200, 10, 0]);
  //const bottomLeftRotate = useTransform(scrollYProgress, [0, animationRange[1]], [-10, 0]);
  //const bottomLeftOpacity = useTransform(scrollYProgress, [0, 0.05, animationRange[1]], [0, 1, 1]);
  const bottomLeftX = useTransform(scrollYProgress, [0, 0.1, animationRange[1]], [-300, 0, 0]); 
const bottomLeftOpacity = useTransform(scrollYProgress, [0, 0.1, animationRange[1]], [0, 1, 1]);


  const cardBaseStyle = "relative max-w-full h-full transition-all duration-200"; // Faster transition

  return (
    <div
      className={`min-h-screen ${isMobile ? 'h-[118vh] overflow-hidden' : 'h-[105vh]'} relative`} // Even shorter scroll height
      style={{
        background: `url('') no-repeat center center fixed`,
        backgroundSize: 'cover'
      }}
    >
      <div className="sticky top-0 h-screen bg-transparent">
        <div className="absolute inset-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto md:grid-rows-2 h-full relative">
          {/* Top Left Card */}
          <motion.div
            className={`${cardBaseStyle} bg-transparent ${isMobile ? 'h-1/2' : 'h-full'}`}
            style={{
              x: topLeftX,
              y: topLeftY,
              scale: topLeftScale,
              rotate: topLeftRotate,
              zIndex: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/panhalady.png"
              alt="Feature visual"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top Right Card */}
          <motion.div
            className={`${cardBaseStyle} bg-transparent flex flex-col items-center justify-center ${isMobile ? 'h-1/2 mt-4' : 'h-full'}`}
            style={{
              x: topRightX,
              //rotate: topRightRotate,
              opacity: topRightOpacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="text-center border-t border-b border-black sm:border-0 md:border-0 lg:border-t lg:border-b lg:border-black">
              <p className="text-2xl font-bold text-blue-600 p-4 sm:text-4xl md:text-4xl">
                "KAASH koi mujhe bina judge kiya meri problem samjh pata"
              </p>
              <p className="text-xl font-bold mt-4 text-blue-800 p-4 sm:text-3xl md:text-3xl">
                CHILL PANHA <span className="font-normal text-gray-500">is here for you</span>
              </p>
              <p className="mt-2 text-sm text-gray-600 p-4 sm:text-xl md:text-xl">Connect with our buddy</p>
              <a href="/login" className="mt-4">
                <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  NOW
                </button>
              </a>
            </div>
          </motion.div>

          {/* Bottom Left Card */}
          <motion.div
            className={`${cardBaseStyle} bg-transparent ${isMobile ? 'col-span-1' : ''}`}
            style={{
              x: bottomLeftX,
              //y: bottomLeftY,
              //rotate: bottomLeftRotate,
              opacity: bottomLeftOpacity,
            }}
            initial={{ opacity: 0, x: -200, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ 
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            <div className="p-6">
              <h1 className="text-4xl font-bold text-blue-500">MANIFESTO</h1>
              <h2 className="text-2xl font-bold text-blue-400 mt-2">PANHA</h2>
              <p className="text-lg mt-4">
                PANHA is a safe supportive platform offering a comprehensive solution for individuals dealing with:
              </p>
              <div className="flex flex-cols grid-cols-2">
                <div className="p-10">
                  <img
                    src="/boy.png"
                    alt="Boy illustration"
                    className="w-24 h-24 mx-auto"
                  />
                </div>
                <div className="p-10">
                  <ul className="list-none mt-4 font-bold text-lg">
                    <li>Trauma</li>
                    <li>Mental health issues</li>
                    <li>Personal challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Card (Target Zone - Now invisible) */}
          <div className="w-full h-full rounded-3xl border-4 border-dashed border-white/0 backdrop-blur-sm bg-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ScrollSectionAnimation;