import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

const ContactForm = () => {
  const [activeFAQ, setActiveFAQ] = React.useState<number | null>(null);
  const faqRef = React.useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  const faqs: FAQItem[] = [
    {
      question: "What information do I need to provide?",
      answer: "Please provide your full name, email address, phone number, and your message."
    },
    {
      question: "How long until I receive a response?",
      answer: "We typically respond within 24-48 business hours."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take data privacy seriously and protect all submitted information."
    }
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqRef.current && !faqRef.current.contains(event.target as Node)) {
        setActiveFAQ(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      formData.append('access_key', process.env.REACT_APP_WEB3FORMS_KEY || '2c85f9ba-970c-4159-b4de-7f53dc23920c');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        reset();
        alert('Form submitted successfully!');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form Submission Error:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // FAQ Component shared between mobile and desktop
  const FAQSection = () => (
    <div ref={faqRef} className="bg-blue-50/30 p-6 rounded-lg flex-grow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left bg-white/50 hover:bg-white/80 flex justify-between items-center transition-colors duration-200"
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              <span className="transform transition-transform duration-200 text-blue-500">
                {activeFAQ === index ? '−' : '+'}
              </span>
            </button>
            {activeFAQ === index && (
              <div className="px-4 py-3 bg-white/30 text-gray-600 animate-slideDown">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-black/5">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-sm rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Contact Us
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-6">
            <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
              <div>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9-+().\s]*$/,
                      message: 'Invalid phone number'
                    }
                  })}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50/30 p-6 rounded-lg">
              <div>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>

            {/* FAQ Section for mobile */}
            <FAQSection />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {/* First Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
                <div>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50/30 p-6 rounded-lg">
                <div>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
                <div>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9-+().\s]*$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* FAQ Section for desktop */}
              <FAQSection />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;