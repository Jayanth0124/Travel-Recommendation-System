import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            <p>&copy; {currentYear} TravelAI. All Rights Reserved.</p>
            <p>
              Designed by{' '}
              <a
                href="http://www.jayanth.site"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                Donavalli Jayanth
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};