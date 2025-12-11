import React, { useState } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { Tooltip } from '../components/Tooltip';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';

const Targeting = () => {
  const { campaignData, addKeyword, removeKeyword, updateField } = useCampaign();
  const [keywordInput, setKeywordInput] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Split by new lines if pasted, or just take the value
      const lines = keywordInput.split('\n');
      lines.forEach(line => addKeyword(line));
      setKeywordInput('');
    }
  };

  const handleNext = () => navigate('/ads');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Keyword Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Keywords</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add keywords that match what your customers are searching for.
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 max-w-sm">
            <strong>Match Types:</strong>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              <li>Broad Match: <span className="font-mono">running shoes</span></li>
              <li>Phrase Match: <span className="font-mono">"running shoes"</span></li>
              <li>Exact Match: <span className="font-mono">[running shoes]</span></li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
           <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue focus:border-google-blue outline-none transition-shadow min-h-[120px]"
              placeholder="Enter keywords (one per line or press Enter)"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
           </div>
           <div className="text-right text-xs text-gray-400 mt-1">
             Press Enter to add
           </div>
        </div>

        {/* Keyword Tags */}
        <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded border border-dashed border-gray-300">
          {campaignData.keywords.length === 0 && (
            <span className="text-gray-400 text-sm italic">No keywords added yet.</span>
          )}
          {campaignData.keywords.map((k) => (
            <span
              key={k.id}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                k.matchType === 'exact' ? 'bg-red-50 text-red-700 border-red-200' :
                k.matchType === 'phrase' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <span className="mr-1 opacity-50 text-xs uppercase tracking-wider">
                {k.matchType}
              </span>
              {k.matchType === 'exact' ? `[${k.text}]` : k.matchType === 'phrase' ? `"${k.text}"` : k.text}
              <button
                onClick={() => removeKeyword(k.id)}
                className="ml-2 hover:bg-black/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Demographics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Demographics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Age */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Age</h4>
            <div className="space-y-2">
              {['18-24', '25-34', '35-44', '45-54', '55-64', '65+'].map((age) => (
                <label key={age} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaignData.demographics.age.includes(age)}
                    onChange={() => {
                      const newAges = campaignData.demographics.age.includes(age)
                        ? campaignData.demographics.age.filter(a => a !== age)
                        : [...campaignData.demographics.age, age];
                      updateField('demographics', { ...campaignData.demographics, age: newAges });
                    }}
                    className="h-4 w-4 text-google-blue rounded border-gray-300 focus:ring-google-blue"
                  />
                  <span className="ml-2 text-sm text-gray-700">{age}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Gender</h4>
             <div className="space-y-2">
              {['Male', 'Female', 'Unknown'].map((gender) => (
                <label key={gender} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaignData.demographics.gender.includes(gender.toLowerCase())}
                    onChange={() => {
                      const val = gender.toLowerCase();
                      const newGenders = campaignData.demographics.gender.includes(val)
                        ? campaignData.demographics.gender.filter(g => g !== val)
                        : [...campaignData.demographics.gender, val];
                      updateField('demographics', { ...campaignData.demographics, gender: newGenders });
                    }}
                    className="h-4 w-4 text-google-blue rounded border-gray-300 focus:ring-google-blue"
                  />
                  <span className="ml-2 text-sm text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => navigate('/campaign')}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-google-blue text-white font-medium rounded hover:bg-google-blue-hover transition-colors shadow-sm"
        >
          Next: Create Ads
        </button>
      </div>
    </div>
  );
};

export default Targeting;
