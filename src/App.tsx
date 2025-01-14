import { FC } from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";

import Register from "./components/Register";
import { noterAuth } from "./firebase";
import { ToastContainer } from "react-toastify";
import Reddit from './components/reddit'
import Landing from './land/c'
import C from './land/choices'
import Fom from './threed/form'
import Stat from './threed/stat'
import Premium from './threed/premiumaccess'
import {PremiumRoute} from './threed/premiumroute'
import Info from './threed/info'

// Protected Route Component
const ProtectedRoute = () => {
  const [user, loading, error] = useAuthState(noterAuth);
  const location = useLocation();
 
  if (error) return null;
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }


  return <Outlet />;
};

// Public Route Component
const PublicRoute = () => {
  const [user] = useAuthState(noterAuth);
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';




 

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      
      { path: "/", element: <Reddit /> },
    
    ]
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "welcome", element: <Landing /> },
      { path: "form", element: <Fom /> },
      { path: "info", element: <Info /> },
  
      {path: "stat",

      element: (
  
       <PremiumRoute>
  
         <Stat />
  
       </PremiumRoute>
  
      ) 
  
     },
     
      { path: "accesss", element: <Premium /> },
    
    ]
  },
  { path: "login", element: <Login/> },
  { path: "*", element: <Navigate to="/login" /> }
]);

const App: FC = () => {
  return (<>
  
 
 
  <div 
      className=" bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <RouterProvider router={router} />
</div>
    </>
  );
};

export default App;