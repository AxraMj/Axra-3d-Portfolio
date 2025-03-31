import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="w-6 h-6" />,
      url: 'https://github.com/AxraMj',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/akshara-manoj/',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="w-6 h-6" />,
      url: 'mailto:akjmanoj24@gmail.com',
      color: 'hover:text-red-500'
    },
    {
      name: 'Resume',
      icon: <FaFileDownload className="w-6 h-6" />,
      url: '/Resume_Akshara.pdf',
      color: 'hover:text-green-500',
      tooltip: 'Download Resume'
    }
  ];

  return (
    <footer className="bg-tertiary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.url}
                  target={link.name === 'Resume' ? undefined : "_blank"}
                  rel={link.name === 'Resume' ? undefined : "noopener noreferrer"}
                  className={`text-white ${link.color} transition-colors duration-300`}
                  aria-label={link.name}
                  download={link.name === 'Resume' ? 'Resume_Akshara.pdf' : undefined}
                >
                  {link.icon}
                </a>
                {link.tooltip && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-tertiary px-2 py-1 rounded text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {link.tooltip}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-tertiary rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Axra MJ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 