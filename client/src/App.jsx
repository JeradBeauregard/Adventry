import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage1 from "./pages/OnboardingPage1"; 
import OnboardingPage2 from "./pages/OnboardingPage2";
import OnboardingPage3 from "./pages/OnboardingPage3";
import OnboardingPage4 from "./pages/OnboardingPage4";
import OnboardingPage5 from "./pages/OnboardingPage5";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding1" element={<OnboardingPage1 />} />
        <Route path="/onboarding2" element={<OnboardingPage2 />} />
        <Route path="/onboarding3" element={<OnboardingPage3 />} />
        <Route path="/onboarding4" element={<OnboardingPage4 />} />
        <Route path="/onboarding5" element={<OnboardingPage5 />} />
      </Routes>
    </Router>
  );
};

export default App;
