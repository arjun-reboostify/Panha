import React, { useState,FormEvent } from 'react';
import { motion } from 'framer-motion';
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
 const [result, setResult] = useState<string>('');
  
  const [formError, setFormError] = useState<string>('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: string; message: string}>({ type: '', message: '' });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9-+().\s]*$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      setResult('');
      setFormError('');
      setIsSubmitting(true);
  
      try {
        const formData = new FormData(event.currentTarget);
        formData.append('access_key', process.env.REACT_APP_WEB3FORMS_KEY || '2c85f9ba-970c-4159-b4de-7f53dc23920c');
  
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
  
        if (data.success) {
          setResult('Form Submitted Successfully 🎉');
          event.currentTarget.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Form Submission Error:', error);
        setFormError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // FAQ Component shared between mobile and desktop
  const FAQSection = () => (
    <div className="bg-blue-50/30 p-6 rounded-lg flex-grow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              className="w-full px-4 py-3 text-left bg-white/50 hover:bg-white/80 flex justify-between items-center transition-colors duration-200"
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              <span className="transform transition-transform duration-200 text-blue-500">
                {activeFAQ === index ? '−' : '+'}
              </span>
            </button>
            {activeFAQ === index && (
              <div className="px-4 py-3 bg-white/30 text-gray-600">
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
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">
          QUERY PAGE
        </h1>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg ${
            status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {status.message}
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-6">
            <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50/30 p-6 rounded-lg">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={4}
                className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-blue-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            <FAQSection />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {/* First Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50/30 p-6 rounded-lg">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={4}
                  className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-blue-50/30 p-6 rounded-lg space-y-6">
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={`w-full px-4 py-3 bg-transparent border-b-2 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:outline-none transition-colors duration-300`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
              {result && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center text-green-600 font-semibold"
                    >
                      {result}
                    </motion.div>
                  )}
        
                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center text-red-600 font-semibold"
                    >
                      {formError}
                    </motion.div>
                  )}
              
              <FAQSection />
            </div>
          </div>
        </form>
        
        
      </div>
    </div>
  );
};

export default ContactForm;