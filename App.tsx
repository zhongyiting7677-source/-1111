import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { TreeMode } from './types';
import { GoogleGenAI } from "@google/genai";

// Included for "Expertise" demonstration, though not strictly driving the 3D visuals.
// We could use this to generate a custom greeting message if we wanted.
const GEMINI_API_KEY = process.env.API_KEY;

export default function App() {
  const [mode, setMode] = useState<TreeMode>('TREE');

  const toggleMode = () => {
    setMode((prev) => (prev === 'TREE' ? 'SCATTERED' : 'TREE'));
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Scene mode={mode} />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16">
        
        {/* Header */}
        <header className="flex justify-between items-start animate-fade-in-down">
          <div>
            <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-600 font-serif-luxury tracking-widest drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
              ARIX
            </h1>
            <p className="text-emerald-400 text-sm tracking-[0.3em] font-light mt-2 uppercase opacity-80">
              Signature Collection
            </p>
          </div>
        </header>

        {/* Interaction Controls */}
        <div className="flex flex-col items-center pointer-events-auto gap-6">
          <p className="text-yellow-100/60 text-xs tracking-widest uppercase">
            {mode === 'TREE' ? 'Tap to Unveil' : 'Tap to Restore'}
          </p>
          
          <button
            onClick={toggleMode}
            className={`
              group relative px-8 py-3 rounded-full 
              border border-yellow-600/30 backdrop-blur-md
              transition-all duration-700 ease-out
              ${mode === 'SCATTERED' ? 'bg-red-900/20 hover:bg-red-900/40' : 'bg-emerald-900/20 hover:bg-emerald-900/40'}
            `}
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_30px_rgba(255,215,0,0.3)]" />
            
            <span className="relative text-yellow-100 font-serif-luxury text-lg tracking-widest">
              {mode === 'TREE' ? 'EXPLODE' : 'ASSEMBLE'}
            </span>
          </button>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-end text-white/30 text-xs tracking-widest">
          <div>
            Interactive 3D Experience
            <br />
            © 2024 Arix Design
          </div>
          <div className="flex gap-4">
             <span>REACT 18</span>
             <span>THREE.JS</span>
             <span>GEMINI</span>
          </div>
        </footer>
      </div>
      
      {/* CSS Animation for UI entry */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}