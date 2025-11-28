
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import flipkart from "../assets/flipkart.webp";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  if (isLoading) return null;

  return (
    <>
     
      {/* Center Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-9">

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-wide ">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to continue to Flipkart
            </p>
          </div>

          {/* Divider */}
          <div className=" bg-white/10"></div>

           <div className="flex items-center justify-center gap-2 shrink-0">
            <img
              src={flipkart}
              alt="Flipkart"
              className="h-16 rounded-full"
            />
        
          </div>

          {/* Login Button */}
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  redirect_uri: "http://localhost:5173/home",
                },
              })
            }


            
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-500 to-indigo-600
              hover:from-blue-600 hover:to-indigo-700
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg cursor-pointer
            "
          >
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-900">
            Login & Enjoy your shopping
          </p>

        </div>
      </div>
    </>
  );
}
