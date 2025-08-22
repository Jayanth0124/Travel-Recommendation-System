import React from 'react';
import { Compass } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Triply</h1>
              <p className="text-xs text-gray-600">AI-Powered Travel Recommendations</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">Powered by</div>
            <div className="text-sm font-semibold text-blue-600">Machine Learning & Cosine Similarity</div>
          </div>
        </div>
      </div>
    </header>
  );
};