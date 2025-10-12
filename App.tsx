// Fix: Create the main App component to handle page rendering and state management.
import React, { useState } from 'react';
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
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage(Page.Home);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage(Page.Home);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.Doctors:
        return <DoctorsPage />;
      case Page.Articles:
        return <ArticlesPage />;
      case Page.Forum:
        return <ForumPage />;
      case Page.AiAssistant:
        return <AiAssistantPage />;
      case Page.Login:
        return <LoginPage handleLogin={handleLogin} />;
      case Page.Profile:
        // A simple guard to redirect to login if not authenticated
        if (isLoggedIn) {
          return <ProfilePage />;
        }
        return <LoginPage handleLogin={handleLogin} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header 
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
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
