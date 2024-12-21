import React, { useState } from 'react';
import { noterFirestore, firebaseTimestamp } from '../firebase/index';

interface Option {
  value: string;
  label: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  preference: string;
  category: string;
}

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    preference: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Define the options for multiple choice and dropdown
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
      // Store in a public submissions collection
      const submissionsRef = noterFirestore.collection('submissions');
      
      await submissionsRef.add({
        ...formData,
        createdAt: firebaseTimestamp()
      });

      setSuccessMessage('Your problem submitted successfully , now relax !');
      setFormData({ name: '', email: '', message: '', preference: '', category: '' });
    } catch (err) {
      setError('Failed to submit the form: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
         <div className='flex'>
    <img 
  src="/logo.jpg"
                  className="h-10 m-5 w-10"
/> <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600  m-5
bg-clip-text text-transparent">
Panha
</h1></div>
      <h2 className="text-2xl font-bold text-center text-black mb-4">Submit Your Problems Anonymously</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="email" className="block text-black mb-1">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='type your e-mail here . . . '
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg focus:ring-2 focus:ring-green-500"
          
          /><p className='text-gray-400'>(just for checking the entry is authentic and not a spam and definitely will not be recorded and discarded after few hours of submission)</p>
        </div>
        <div>
        <label className="block text-2xl text-black m-2">*Related to ...</label>
<div className="space-y-2">
  {preferenceOptions.map((option) => (
    <label
      key={option.value}
      htmlFor={option.value}
      className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-lg"
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
      <span className="text-lg text-black font-medium">{option.label}</span>
    </label>
  ))}
</div>

</div>
<div>
          <label htmlFor="name" className="block text-black mb-1">If chosen other above</label>
          <input
            type="text"
            id="name"
            placeholder='write your problem here ... '
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg focus:ring-2 focus:ring-green-500"
          
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-black mb-1">Type ?</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-100` text-black rounded-lg focus:ring-2 focus:ring-green-500"
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
          <label htmlFor="message" className="block text-black mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
            placeholder='enter your thought openly .......'
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full px-6 py-2 text-black rounded-lg transition-colors ${isLoading ? 'bg-blue-300' : 'bg-blue-400 '}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <div className="bg-red-600 text-black p-3 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-blue-500 text-black p-3 rounded mb-4">{successMessage}</div>}
      </form>
    </div>
  );
};

export default InputForm;