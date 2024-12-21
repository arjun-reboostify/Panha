import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

export const PremiumRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const location = useLocation();
  const isPremium = localStorage.getItem('premiumAccess') === 'true';

  

  if (!isPremium) {
    toast.warning('admin access required');
    return <Navigate to="/accesss" />;
  }

  return <>{children}</>;
};