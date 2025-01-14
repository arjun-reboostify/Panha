import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Layers, Zap, Database } from 'lucide-react';

const ScrollSectionAnimation = () => {
  const { scrollYProgress } = useViewportScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const animationRange = isMobile ? [0, 0.8] : [0, 0.6];
  
  // Reduced movement values for contained animations
  const topLeftX = useTransform(scrollYProgress, [0, 0.3, animationRange[1]], 
    isMobile ? [0, 50, 75] : [0, 500, 750]
  );
  const topLeftY = useTransform(scrollYProgress, [0, 0.3, animationRange[1]], 
    isMobile ? [0, 100, 150] : [0, 250, 350]
  );
  const topLeftScale = useTransform(scrollYProgress, [0, 0.3, animationRange[1]], [1, 0.98, 1]);
  const topLeftRotate = useTransform(scrollYProgress, animationRange, [0, 0]);
  
  const topRightX = useTransform(scrollYProgress, [0, 0.4, animationRange[1]], 
    isMobile ? [0, 25, 50] : [0, 500, 1000]
  );
  const topRightRotate = useTransform(scrollYProgress, animationRange, [0, -18.75]);
  const topRightOpacity = useTransform(scrollYProgress, [0, 0.4, animationRange[1]], [1, 0.5, 0]);
  
  const bottomLeftX = useTransform(scrollYProgress, [0, 0.2, animationRange[1]], 
    isMobile ? [-50, 25, 0] : [-500, 100, 0]
  );
  const bottomLeftRotate = useTransform(scrollYProgress, animationRange, [-18.75, 0]);
  const bottomLeftOpacity = useTransform(scrollYProgress, [0, 0.2, animationRange[1]], [0, 0.5, 1]);

  const cardBaseStyle = "relative max-w-full h-full contain-layout contain-paint";
  
  return (
    <div 
      className={`min-h-screen ${isMobile ? 'h-[250vh]' : 'h-[200vh]'} relative contain-layout`}
      style={{
        background: `url('') no-repeat center center fixed`,
        backgroundSize: 'cover',
        contain: 'layout paint',
        clipPath: 'inset(0)'
      }}
    >
      <div className="sticky top-0 h-screen bg-transparent contain-layout" style={{ contain: 'layout paint' }}>
        <div className="absolute inset-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 h-full relative max-w-screen contain-layout" style={{ contain: 'layout paint' }}>
          {/* Top Left Card */}
          <motion.div 
            className={`${cardBaseStyle}`}
            style={{
              x: topLeftX,
              y: topLeftY,
              scale: topLeftScale,
              rotate: topLeftRotate,
              zIndex: 10,
              contain: 'layout paint'
            }}
          >
           <img 
              src="/panhalady.png"
              alt="Feature visual"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top Right Card */}
          <motion.div 
            className={`${cardBaseStyle} flex flex-col items-center justify-center`}
            style={{
              x: topRightX,
              rotate: topRightRotate,
              opacity: topRightOpacity,
              contain: 'layout paint'
            }}
          >
            <div className="text-center border-t border-b border-black sm:border-0 md:border-0 lg:border-t lg:border-b lg:border-black w-full px-4">
              <p className="text-2xl font-bold text-blue-600 p-4 sm:text-4xl md:text-4xl">
                "KAASH koi mujhe bina judge kiya meri problem samjh pata"
              </p>
              <p className="text-xl font-bold mt-4 text-blue-800 p-4 sm:text-3xl md:text-3xl">
                CHILL PANHA <span className="font-normal text-gray-500">is here for you</span>
              </p>
              <p className="mt-2 text-sm text-gray-600 p-4 sm:text-xl md:text-xl">Connect with our buddy</p>
              <a href="/login" className="mt-4 inline-block">
                <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  NOW
                </button>
              </a>
            </div>
          </motion.div>

          {/* Bottom Left Card */}
          <motion.div 
            className={`${cardBaseStyle}`}
            style={{
              x: bottomLeftX,
              rotate: bottomLeftRotate,
              opacity: bottomLeftOpacity,
              contain: 'layout paint'
            }}
          >
            <div className="p-6">
              <h1 className="text-4xl font-bold text-blue-500">MANIFESTO</h1>
              <h2 className="text-2xl font-bold text-blue-400 mt-2">PANHA</h2>
              <p className="text-lg mt-4">
                PANHA is a safe supportive platform offering a comprehensive solution for individuals dealing with:
              </p>
              <div className="flex flex-wrap">
                <div className='p-4 md:p-10'>
                  <img
                    src="/boy.png"
                    alt="Boy illustration"
                    className="w-24 h-24 mx-auto"
                  />
                </div>
                <div className='p-4 md:p-10'>
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