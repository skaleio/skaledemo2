
import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-6xl font-black font-orbitron text-primary tracking-wider animate-heartbeat">
          SKALE
        </h1>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
