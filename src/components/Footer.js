import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-80  text-gray-300 py-4 border-t border-purple-500">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 CryptoWallet. All rights reserved.
        Made by{' '}
          <a
            href="https://portfolio-garbuz.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 font-semibold"
          >
            Shay Garbuz
          </a>{' '}
          &{' '}
          <a
            href="https://www.linkedin.com/in/may-caspi-332236254?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B228GcC8zRVWvPQaToosq4w%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 font-semibold"
          >
            May Caspi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

