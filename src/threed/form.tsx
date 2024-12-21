import React, { useState } from 'react';
import { noterFirestore, firebaseTimestamp } from '../firebase/index';
import { Moon, Sun } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormData {
  name: string;
  no: string;
  email: string;
  message: string;
  preference: string;
  category: string;
}

const InputForm: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    no: '',
    email: '',
    message: '',
    preference: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const preferenceOptions: Option[] = [
    { value: 'breakup_trauma', label: 'Breakup trauma or toxic relationship' },
    { value: 'financial_burden', label: 'Financial burden' },
    { value: 'family_disputes', label: 'Family disputes' },
    { value: 'harassment', label: 'Harassment or stalking related' },
    { value: 'lonely_overthinking', label: 'Lonely and overthinking' },
    { value: 'academics', label: 'Academics' },
    { value: 'other', label: 'Other' },
  ];

  const categoryOptions: Option[] = [
    { value: 'personal', label: 'Request for advice' },
    { value: 'business', label: 'Rant' },
    { value: 'education', label: 'Confession' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const submissionsRef = noterFirestore.collection('submissions');
      await submissionsRef.add({
        ...formData,
        createdAt: firebaseTimestamp()
      });

      setSuccessMessage('Your problem submitted successfully, now relax!');
      setFormData({ name: '', no:'',email: '', message: '', preference: '', category: '' });
    } catch (err) {
      setError('Failed to submit the form: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="fixed top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors duration-300 ${
            darkMode ? 'bg-black text-yellow-300' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <div className="relative w-6 h-6">
            <div className={`absolute transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
              <Moon size={24} />
            </div>
            <div className={`absolute transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
              <Sun size={24} />
            </div>
          </div>
        </button>
      </div>

      <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className='flex justify-center items-center'>
          <img src="/logo.jpg" className="h-10 w-10" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 m-5 bg-clip-text text-transparent">
            Panha
          </h1>
        </div>
        
        <h2 className={`text-2xl font-bold text-center mb-4 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          Submit Your Problems Anonymously
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={`block mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Email<p className='text-gray-400'>(not required)</p>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='type your e-mail here . . . '
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
              }`}
            />
            <p className='text-gray-400'>
              (just for checking the entry is authentic and not a spam and definitely will not be recorded and discarded after few hours of submission)
            </p>
          </div>

          <div>
            <label className={`block text-2xl m-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              *Related to ...
            </label>
            <div className="space-y-2">
              {preferenceOptions.map((option) => (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
                    darkMode ? 'bg-gray-900 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    id={option.value}
                    name="preference"
                    value={option.value}
                    checked={formData.preference === option.value}
                    onChange={handleInputChange}
                    className="mr-3 w-6 h-6 text-green-500 focus:ring-green-500"
                    required
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="name" className={`block mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              If chosen other above
            </label>
            <input
              type="text"
              id="name"
              placeholder='write your problem here ... '
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
              }`}
            />
          </div>

          <div>
            <label htmlFor="category" className={`block mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Type ?
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
              }`}
              required
            >
              <option value="">Select type of your submission</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className={`block mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
             Pour your heart out. It's completely anonymous
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 resize-none transition-colors duration-300 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
              }`}
              placeholder='enter your thought openly .......'
              rows={4}
              required
            />
          </div>
          <div>
  <label
    htmlFor="no"
    className={`block mb-1 transition-colors duration-300 ${
      darkMode ? 'text-white' : 'text-black'
    }`}
  >
    Phone No. <p className='text-gray-500'>not required</p>
  </label>
  <input
    type="text"
    id="no"
    placeholder="+91 . . . . .  . . . . . 10 digits"
    name="no"
    value={formData.no}
    onChange={handleInputChange}
    maxLength={10} // Restrict the input to 10 characters
    pattern="[0-9]{10}" // Allow only 10 numeric characters
    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}
  />
</div>

          <button
            type="submit"
            className={`w-full px-6 py-2 rounded-lg transition-colors duration-300 ${
              isLoading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-400 text-black hover:bg-blue-500'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

          {error && (
            <div className={`p-3 rounded mb-4 ${
              darkMode ? 'bg-red-700' : 'bg-red-600'
            } text-white`}>
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className={`p-3 rounded mb-4 ${
              darkMode ? 'bg-blue-700' : 'bg-blue-500'
            } text-white`}>
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputForm;