import React, { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Side from '../components/overlays/Sidebar'
const PremiumAccess: React.FC = () => {

  const [premiumCode, setPremiumCode] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  // Check for existing premium status on component mount
  useEffect(() => {
    const storedPremiumStatus = localStorage.getItem('premiumAccess');
    if (storedPremiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  const handlePremiumAccess = () => {
    // Simple premium code validation (replace with your preferred logic)
    if (premiumCode.trim() === 'admin@1234') {
      setIsPremium(true);
      localStorage.setItem('premiumAccess', 'true');
      toast.success('Premium access granted!');
      
      // Redirect to home or a specific premium page
      navigate('/');
    } else {
      toast.error('Invalid premium code');
      setIsPremium(false);
    }
  };


  return (<><Side />
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Premium Access</h2>
        
     

        {!isPremium ? (
          <>
            <div className="mb-4">
              <input 
                type="text" 
                value={premiumCode}
                onChange={(e) => setPremiumCode(e.target.value)}
                placeholder="Enter 12-digit premium code" 
                maxLength={10}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button 
              onClick={handlePremiumAccess}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-300"
            >
              Unlock Admin Access
            </button>
          </>
        ) : (
          <div className="text-center">
           
            <div className="space-y-2">
              
              <button 
                onClick={() => navigate('/stat')}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
              >
                Go to Admin Route
              </button>
            </div>
          </div>
        )}
      </div>
    </div></>
  );
};

export default PremiumAccess;