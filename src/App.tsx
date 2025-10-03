// App.tsx

import './App.css'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/Profile';
import CoursePage from './pages/CoursePage';
import Login from './pages/Login';
import Register from './pages/Register';
import '@fontsource/inter/400.css'; // Regular weight
import '@fontsource/inter/700.css'; // Bold weight

function App() {
  return (
    // add banner, make homepage better looking
    // add edit
    // fix the way delete works -- fixed
    <div className="min-h-screen bg-background text-foreground"> 
      <AuthProvider>
        <NavBar />
        <main className="container mx-auto px-8 pb-4">
          <Routes>
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </AuthProvider>    
    </div>
  );
}

export default App;