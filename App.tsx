// Fix: Create the main App component to handle page rendering and state management.
// FIX: Corrected the import statement for React and its hooks to resolve multiple compilation errors.
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AiFab } from './components/AiFab';
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ForumPage } from './pages/ForumPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { Page, Appointment, Doctor } from './types';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

// Initialize Firebase app using environment variables (set these in your .env file)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


function App() {
  // FIX: Use User type from Firebase v9+ modular SDK.
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    // FIX: Use Firebase v9+ onAuthStateChanged method.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const storedAppointments = localStorage.getItem('userAppointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Failed to load appointments from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('userAppointments', JSON.stringify(appointments));
    } catch (error) {
      console.error("Failed to save appointments to localStorage", error);
    }
  }, [appointments]);
  
  const handleLogout = () => {
    // FIX: Use Firebase v9+ signOut method.
    signOut(auth).then(() => {
      setCurrentPage(Page.Home);
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const handleBookAppointment = (doctor: Doctor, time: string) => {
    const newAppointment: Appointment = {
      id: Date.now(),
      doctor,
      time,
    };
    setAppointments(prev => [...prev, newAppointment].sort((a, b) => a.time.localeCompare(b.time)));
  };

  const handleCancelAppointment = (appointmentId: number) => {
      setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  };
  
  const renderPage = () => {
    if (isAuthLoading) {
      return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.Doctors:
        return <DoctorsPage onBookAppointment={handleBookAppointment} />;
      case Page.Appointments:
        if (user) {
          return <AppointmentsPage appointments={appointments} onCancel={handleCancelAppointment} setCurrentPage={setCurrentPage} />;
        }
        setCurrentPage(Page.Login);
        return <LoginPage />;
      case Page.Articles:
        return <ArticlesPage />;
      case Page.Forum:
        return <ForumPage />;
      case Page.AiAssistant:
        return <AiAssistantPage />;
      case Page.Login:
        if(user) {
          setCurrentPage(Page.Home);
          return <HomePage setCurrentPage={setCurrentPage} />;
        }
        return <LoginPage />;
      case Page.Profile:
        if (user) {
          return <ProfilePage />;
        }
        setCurrentPage(Page.Login);
        return <LoginPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header 
        setCurrentPage={setCurrentPage}
        isLoggedIn={!!user}
        handleLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== Page.AiAssistant && <AiFab setCurrentPage={setCurrentPage} />}
      <Footer />
    </div>
  );
}

export default App;