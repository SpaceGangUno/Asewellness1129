import React, { useState } from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover animate-pulse-soft"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-emerald-700/80 backdrop-blur-sm" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-natural-gradient rounded-full opacity-20 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-gradient rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 mb-8 text-shadow-lg">
            Start Your Wellness Journey Today
          </h1>
          
          <p className="text-xl text-emerald-50 mb-12 leading-relaxed max-w-xl glass-effect p-6 rounded-xl backdrop-blur-md bg-white/5">
            Experience the power of natural detoxification. Our carefully crafted programs 
            help cleanse your body, boost energy levels, and restore your natural balance.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-emerald-900 text-lg font-semibold hover:bg-white/90 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Transform Your Life with Our Detox Programs
              <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Quiz Component */}
          <DetoxQuiz 
            isOpen={isQuizOpen} 
            onClose={() => setIsQuizOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
}
