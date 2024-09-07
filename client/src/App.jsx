import FloatingShape from "./components/FloatingShape"
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashBoard from "./pages/DashBoard";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/RestPassword";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = userAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = userAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = userAuthStore();
 
  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
    className='min-h-screen bg-gradient-to-br
  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
  >
    <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
    <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
    <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
    <Routes>
				<Route path="/" element={<ProtectedRoute>
          <DashBoard /> 
        </ProtectedRoute>} />
        <Route path="/signup" element= {<RedirectAuthenticatedUser>
          <Signup />
        </RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser>
          <Login />
        </RedirectAuthenticatedUser>} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgetPassword />
        </RedirectAuthenticatedUser>} />
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>} />
			</Routes>
      <Toaster />
    </div>
  )
}

export default App
