import React ,{useState,useEffect} from 'react';

interface QAItem {
  question: string;
  answer: string;
}

const QAComponent = () => {
    const [isMobile, setIsMobile] = useState(false);
  const qaItems: QAItem[] = [
    {
      question: "What is your primary goal?",
      answer: "Our primary goal is to deliver exceptional value to our customers."
    },
    {
      question: "How do we achieve success?",
      answer: "Through dedication, innovation, and constant improvement."
    },
    {
      question: "Why choose us?",
      answer: "We bring years of expertise and a commitment to excellence."
    }
  ];


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <div className={`relative w-full min-h-screen p-4 ${isMobile ? 'overflow-hidden' : ''}`}>
      {/* Left hand */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-50 md:w-50 lg:w-50">
        <img 
          src="/lefthand.png"
          alt="Left pointing hand"
          className="w-full h-auto transform -translate-x-1/4"
        />
      </div>

      {/* Right hand */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-50 md:w-50 lg:w-50">
        <img 
          src="/righthand.png"
          alt="Right pointing hand"
          className="w-full h-full transform translate-x-1/4"
        />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-2xl my-8 px-8 py-12 bg-gray-800/70 rounded-lg shadow-lg">
        <div className="space-y-6">
          {qaItems.map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {item.question}
              </h3>
              <p className="text-gray-200 text-base md:text-lg">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QAComponent;