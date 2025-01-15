import React, { useState, FormEvent } from 'react';
import { Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  href: string;
}

const ContactSection = () => {
  const [result, setResult] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const socialLinks: SocialLink[] = [
    {
      icon: <Github className="w-5 h-5" />,
      name: 'GitHub',
      href: 'https://github.com/yourusername'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: 'Twitter',
      href: 'https://twitter.com/yourusername'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername'
    }
  ];

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-sm"
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-0 py-2 bg-transparent border-b placeholder-black/60 border-black  focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            
            <div>
  <input
    type="email"
    id="email"
    name="email"
    className="w-full px-0 py-2 bg-transparent border-b placeholder-black/60 border-black  focus:outline-none"
    placeholder="enter your email here ..."
    required
  />
</div>

            <div>
              <textarea
                id="message"
                name="message"
                rows={4}
               className="w-full px-0 py-2 bg-transparent border-b placeholder-black/60 border-black  focus:outline-none"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 border-2 border-black/80 text-black/80 rounded-none hover:bg-black/5 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Submit Form'}
            </motion.button>
          </form>

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
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-sm"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <motion.a
                  href="mailto:contact@example.com"
                  className="flex items-center space-x-3 p-2 border-b-2 border-black/20 hover:border-black/80 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="w-5 h-5 text-black/60 group-hover:text-black/80" />
                  <span className="text-black/60 group-hover:text-black/80">contact@example.com</span>
                </motion.a>
                <motion.a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 p-2 border-b-2 border-black/20 hover:border-black/80 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <Phone className="w-5 h-5 text-black/60 group-hover:text-black/80" />
                  <span className="text-black/60 group-hover:text-black/80">+1 (234) 567-890</span>
                </motion.a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Connect With Us</h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 border-b-2 border-black/20 hover:border-black/80 transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-black/60 group-hover:text-black/80">{link.icon}</span>
                    <span className="text-black/60 group-hover:text-black/80">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;