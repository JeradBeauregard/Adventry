import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage1 from "./pages/OnboardingPage1";
import OnboardingPage2 from "./pages/OnboardingPage2";
import OnboardingPage3 from "./pages/OnboardingPage3";
import OnboardingPage4 from "./pages/OnboardingPage4";
import OnboardingPage5 from "./pages/OnboardingPage5";
import OnboardingPage6 from "./pages/OnboardingPage6";
import OnboardingPage7 from "./pages/OnboardingPage7";
import OnboardingPage8 from "./pages/OnboardingPage8";
import HomePage from "./pages/HomePage";
import JournalPage1 from "./pages/JournalPage1";
import JournalsPage from "./pages/JournalsPage"; // ✅ New
import JournalPage from "./pages/journalPage";

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
        <Route path="/onboarding6" element={<OnboardingPage6 />} />
        <Route path="/onboarding7" element={<OnboardingPage7 />} />
        <Route path="/onboarding8" element={<OnboardingPage8 />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/JournalPage1" element={<JournalPage1 />} />
        <Route path="/journaltest/:id" element={<JournalsPage />} />
        <Route path="/Journal/:id" element={<JournalPage />} />

      </Routes>
    </Router>
  );
};

export default App;
