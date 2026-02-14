import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-10 py-6 px-8 text-sm text-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left */}
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} CrixBlog. All rights reserved.</p>
          <p className="text-xs text-gray-500">Read millions of stories around the world</p>
        </div>

        {/* Center - Navigation Links */}
        

        {/* Right - Designer Credit */}
        <div className="text-center md:text-right">
          <p>
            Designed by{' '}
            <a
              href="https://yourportfolio.com" // <-- Replace with your link
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium hover:underline"
            >
              Asish Kumar Bera
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
