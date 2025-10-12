// Fix: Create the Header component with navigation and login/logout functionality.
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface HeaderProps {
  setCurrentPage: (page: Page) => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-gray-600 hover:text-teal-700 font-medium transition-colors">
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ setCurrentPage, isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isMenuOpen]);

  const handleMobileLinkClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleMobileLogout = () => {
    handleLogout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
            <svg className="w-8 h-8 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/>
            </svg>
            <span className="text-2xl font-bold text-gray-800">MediGen</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink onClick={() => setCurrentPage(Page.Home)}>Home</NavLink>
            <NavLink onClick={() => setCurrentPage(Page.Doctors)}>Find a Doctor</NavLink>
            <NavLink onClick={() => setCurrentPage(Page.Articles)}>Articles</NavLink>
            <NavLink onClick={() => setCurrentPage(Page.Forum)}>Forum</NavLink>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button onClick={() => setCurrentPage(Page.Profile)} className="font-medium text-gray-600 hover:text-teal-700">Profile</button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentPage(Page.Login)}
                className="px-5 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-semibold"
              >
                Login
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden bg-white p-4 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleMobileLinkClick(Page.Home)}>
                <svg className="w-8 h-8 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/>
                </svg>
                <span className="text-2xl font-bold text-gray-800">MediGen</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <nav className="flex flex-col items-center space-y-6">
            <button onClick={() => handleMobileLinkClick(Page.Home)} className="text-xl font-medium text-gray-700 hover:text-teal-700">Home</button>
            <button onClick={() => handleMobileLinkClick(Page.Doctors)} className="text-xl font-medium text-gray-700 hover:text-teal-700">Find a Doctor</button>
            <button onClick={() => handleMobileLinkClick(Page.Articles)} className="text-xl font-medium text-gray-700 hover:text-teal-700">Articles</button>
            <button onClick={() => handleMobileLinkClick(Page.Forum)} className="text-xl font-medium text-gray-700 hover:text-teal-700">Forum</button>
            <div className="border-t border-gray-200 w-1/2 my-4"></div>
            {isLoggedIn ? (
                <>
                    <button onClick={() => handleMobileLinkClick(Page.Profile)} className="text-xl font-medium text-gray-700 hover:text-teal-700">Profile</button>
                    <button onClick={handleMobileLogout} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">Log Out</button>
                </>
            ) : (
                <button onClick={() => handleMobileLinkClick(Page.Login)} className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-semibold">Login</button>
            )}
        </nav>
      </div>
    </>
  );
};
