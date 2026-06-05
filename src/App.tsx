// App.tsx

import './App.css'
import { Link, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/Profile';
import CoursePage from './pages/CoursePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import '@fontsource/inter/400.css'; // Regular weight
import '@fontsource/inter/700.css'; // Bold weight
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    // add banner, make homepage better looking
    // add edit
    // fix the way delete works -- fixed
    <div className="min-h-screen bg-background text-foreground"> 
      <AuthProvider>
        <NavBar />
        <main className="pb-4">
          <Routes>
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </AuthProvider>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Carleton Course Reviews. Built by Students, for Students.
        <br />
        <span className="mt-1 inline-block">
          <Link to="/privacy-policy" className="text-primary hover:text-primary/80 transition-colors underline">
            Privacy Policy
          </Link>
          {' '}•{' '}
          <Link to="/terms-of-service" className="text-primary hover:text-primary/80 transition-colors underline">
            Terms of Service
          </Link>
          {' '}•{' '}
          Created by{' '}
          <a 
            href="https://www.linkedin.com/in/oceanyu/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors underline"
          >
            Ocean Yu
          </a>
        </span>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;