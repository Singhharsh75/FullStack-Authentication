import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FloatingCircles from "./components/FloatingCircles";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerification from "./pages/EmailVerificationPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ForgotPasswordReq from "./pages/ForgotPasswordReq";
import { Toaster } from "react-hot-toast";
import { useStore } from "./store/auth.store";
import { useEffect } from "react";
import DashBoardPage from "./pages/DashBoardPage";

const ProtectedHome = ({ children }) => {
  const { user, isAuthorized, isCheckingAuth } = useStore();

  if (user && !user.isVerified) {
    return <Navigate to="/email-verify" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RedirectToHome = ({ children }) => {
  const { user, isAuthorized } = useStore();
  console.log(user);
  const navigate = useNavigate();
  if (isAuthorized && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isAuthorized, isCheckingAuth, checkAuth, user } = useStore();

  useEffect(() => {
    // console.log(user, isCheckingAuth, isAuthorized);
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingCircles
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingCircles
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={2}
      />
      <FloatingCircles
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={5}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedHome>
              <DashBoardPage />
            </ProtectedHome>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectToHome>
              <SignUpPage />
            </RedirectToHome>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectToHome>
              <LogInPage />
            </RedirectToHome>
          }
        />
        <Route path="/email-verify" element={<EmailVerification />} />
        <Route path="/forgot-password-req" element={<ForgotPasswordReq />} />
        <Route path="/forgot-password/:token" element={<ForgotPassword />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
