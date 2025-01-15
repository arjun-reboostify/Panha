import React ,{useState,useEffect} from 'react';

interface QAItem {
  question: string;
  answer: string;
}

const QAComponent = () => {
    const [isMobile, setIsMobile] = useState(false);
  const qaItems: QAItem[] = [
    {
      question: "What does panha exactly do?",
      answer: "PANHA is a safe and supportive platform offering a Comprehensive solution for individuals dealing with trauma , mental health issue or personal issue"
    },
    {
      question: "Which types of services PANHA offers?",
      answer: "PANHA offer a one step solution to your problems by providing you with a buddy service , anonymous chat platform and a counselling therapy session"

    },
    {
      question: "Which types of problems can we share with buddy?",
      answer: "we provide buddy for you to share any sort of problem with them ( breakup, family disputes , academics pressure, financial stress, loneliness , overthinking or any other challenge)."
    },
    {question:"Is our talk here anonymous?",
        answer:"Every problem you shared is its purely confidential because we understand and we care."
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

        <h1 className='text-center text-4xl font-bold text-blue-400'>QUESTIONS AND ANSWERS</h1>
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