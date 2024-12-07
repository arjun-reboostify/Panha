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
    return <Navigate to="/show" state={{ from: location }} />;
  }


  return <Outlet />;
};

// Public Route Component
const PublicRoute = () => {
  const [user] = useAuthState(noterAuth);
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  if (user) {
   
    return <Navigate to={from} />;
  }

 

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
    
    ]
  },
  { path: "Show", element: <Reddit/> },
  { path: "*", element: <Navigate to="/Show" /> }
]);

const App: FC = () => {
  return (<>
  
 
    <div className="bg-black min-h-screen w-full">

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