import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-t border-cyan-500/20 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>by</span>
            <a 
              href="https://mroppy.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 hover:glow"
            >
              MR. OPPY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};