import { Route, Routes } from "react-router-dom";
import FloatingCircles from "./components/FloatingCircles";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerification from "./pages/EmailVerificationPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

function App() {
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
        <Route path="/" element={"Home"} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/email-verify" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
