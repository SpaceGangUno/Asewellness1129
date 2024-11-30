import React from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Reset Your Body" },
  { icon: Leaf, text: "Natural Ingredients" },
  { icon: Battery, text: "Boost Energy" },
];

export default function Hero() {
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
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-500/20 text-emerald-100 mb-8 backdrop-blur-sm hover:bg-emerald-500/30 transition-colors duration-300 cursor-default">
            <Sparkles className="h-5 w-5 mr-3 animate-pulse-soft" />
            <span className="text-lg font-medium">Transform Your Life with Our Detox Programs</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 mb-8 text-shadow-lg">
            Start Your Wellness Journey Today
          </h1>
          
          <p className="text-xl text-emerald-50 mb-12 leading-relaxed max-w-xl glass-effect p-6 rounded-xl backdrop-blur-md bg-white/5">
            Experience the power of natural detoxification. Our carefully crafted programs 
            help cleanse your body, boost energy levels, and restore your natural balance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="flex items-center space-x-3 text-emerald-100 bg-white/5 backdrop-blur-sm p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="p-2 rounded-lg bg-natural-gradient">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-lg">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <DetoxQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}
