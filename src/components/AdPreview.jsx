import React from 'react';

export const AdPreview = ({ finalUrl, headlines, descriptions, displayUrlPath }) => {
  // Logic to rotate headlines/descriptions or show first few
  const visibleHeadlines = headlines.slice(0, 3).join(' | ') || 'Your Headline Here';
  const visibleDescription = descriptions[0] || 'Your description text will appear here. Add unique details about your business.';

  // Parse domain from finalUrl
  let domain = 'example.com';
  try {
    if (finalUrl) {
      domain = new URL(finalUrl.startsWith('http') ? finalUrl : `https://${finalUrl}`).hostname;
    }
  } catch (e) {}

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm max-w-md mx-auto">
       <div className="flex items-center mb-1">
         <span className="font-bold text-black text-sm mr-2">Ad</span>
         <span className="text-sm text-gray-700">{domain}</span>
       </div>
       <div className="mb-1">
         <a href="#" className="text-[#1a0dab] text-xl font-normal hover:underline block leading-snug">
           {visibleHeadlines}
         </a>
       </div>
       <div className="text-sm text-[#4d5156] leading-relaxed">
         {visibleDescription}
       </div>

       {/* Extensions mock (Educational flair) */}
       <div className="mt-2 flex gap-2 overflow-hidden">
         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Sitelink 1</span>
         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Callout 2</span>
       </div>
    </div>
  );
};
