import React from 'react';
import { Info } from 'lucide-react';

export const Tooltip = ({ content }) => {
  return (
    <div className="group relative inline-block ml-2 align-middle">
      <Info className="w-4 h-4 text-gray-400 cursor-help hover:text-google-blue" />
      <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded shadow-lg z-50">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
};
