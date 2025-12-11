import React from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { AlertCircle, CheckCircle2, Circle } from 'lucide-react';

export const AdStrength = () => {
  const { campaignData } = useCampaign();

  // Calculate Score
  let score = 0;
  const checks = {
    headlinesCount: campaignData.headlines.length >= 5, // Good to have 5+
    descriptionsCount: campaignData.descriptions.length >= 2,
    keywordInHeadline: false,
    keywordInDescription: false,
    uniqueHeadlines: new Set(campaignData.headlines).size === campaignData.headlines.length && campaignData.headlines.length > 0,
  };

  // Check keyword relevance
  const keywords = campaignData.keywords.map(k => k.text.toLowerCase());
  if (keywords.length > 0) {
    checks.keywordInHeadline = campaignData.headlines.some(h =>
      keywords.some(k => h.toLowerCase().includes(k))
    );
    checks.keywordInDescription = campaignData.descriptions.some(d =>
      keywords.some(k => d.toLowerCase().includes(k))
    );
  } else {
    // If no keywords, these pass trivially to avoid frustrating user who hasn't added keywords yet?
    // No, better to fail them to encourage adding keywords.
  }

  // Weighted Scoring
  if (checks.headlinesCount) score += 20;
  if (campaignData.headlines.length >= 8) score += 10; // Bonus for maxing out
  if (checks.descriptionsCount) score += 20;
  if (checks.keywordInHeadline) score += 25;
  if (checks.keywordInDescription) score += 15;
  if (checks.uniqueHeadlines) score += 10;

  // Determine Label and Color
  let label = 'Incomplete';
  let color = 'text-gray-500';
  let bgColor = 'bg-gray-200';
  let ringColor = 'ring-gray-200';

  if (campaignData.headlines.length === 0) {
    label = 'Incomplete';
  } else if (score < 40) {
    label = 'Poor';
    color = 'text-red-600';
    bgColor = 'bg-red-600';
    ringColor = 'ring-red-200';
  } else if (score < 70) {
    label = 'Average';
    color = 'text-yellow-600';
    bgColor = 'bg-yellow-500';
    ringColor = 'ring-yellow-200';
  } else if (score < 90) {
    label = 'Good';
    color = 'text-blue-600';
    bgColor = 'bg-blue-600';
    ringColor = 'ring-blue-200';
  } else {
    label = 'Excellent';
    color = 'text-green-600';
    bgColor = 'bg-green-600';
    ringColor = 'ring-green-200';
  }

  // Circular Progress Logic
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Ad Strength</h3>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-2">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-100"
            />
            {/* Progress Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`${color} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
             {label === 'Incomplete' ? '--' : `${score}%`}
          </div>
        </div>
        <div className={`text-lg font-bold ${color}`}>{label}</div>
      </div>

      <div className="space-y-3">
        <CheckItem label="Add more headlines (5+)" passed={checks.headlinesCount} />
        <CheckItem label="Include popular keywords in headlines" passed={checks.keywordInHeadline} />
        <CheckItem label="Make headlines unique" passed={checks.uniqueHeadlines} />
        <CheckItem label="Include keywords in descriptions" passed={checks.keywordInDescription} />
      </div>
    </div>
  );
};

const CheckItem = ({ label, passed }) => (
  <div className="flex items-start">
    {passed ? (
      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
    ) : (
      <Circle className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
    )}
    <span className={`text-sm ${passed ? 'text-gray-700' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default AdStrength;
