import React from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { Tooltip } from '../components/Tooltip';
import { useNavigate } from 'react-router-dom';

const CampaignSetup = () => {
  const { campaignData, updateField } = useCampaign();
  const navigate = useNavigate();

  const handleNext = () => navigate('/targeting');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">General Settings</h3>

        {/* Campaign Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            className="w-full max-w-lg p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue focus:border-google-blue outline-none transition-all"
            placeholder="e.g., Summer Sale 2024"
            value={campaignData.campaignName}
            onChange={(e) => updateField('campaignName', e.target.value)}
          />
        </div>

        {/* Network Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Networks
            <Tooltip content="Where your ads will appear. Search Network is for people actively looking for you. Display Network is for passive browsing." />
          </label>
          <div className="space-y-3 max-w-2xl">
            <div
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${campaignData.networks.search ? 'border-google-blue bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => updateField('networks', { ...campaignData.networks, search: !campaignData.networks.search })}
            >
              <input
                type="checkbox"
                checked={campaignData.networks.search}
                readOnly
                className="mt-1 mr-3 h-4 w-4 text-google-blue focus:ring-google-blue"
              />
              <div>
                <p className="font-medium text-gray-900">Google Search Network</p>
                <p className="text-sm text-gray-500">Ads can appear near Google Search results and other Google sites when people search for terms that are relevant to your keywords.</p>
              </div>
            </div>

            <div
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${campaignData.networks.display ? 'border-google-blue bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => updateField('networks', { ...campaignData.networks, display: !campaignData.networks.display })}
            >
              <input
                type="checkbox"
                checked={campaignData.networks.display}
                readOnly
                className="mt-1 mr-3 h-4 w-4 text-google-blue focus:ring-google-blue"
              />
              <div>
                <p className="font-medium text-gray-900">Google Display Network</p>
                <p className="text-sm text-gray-500">Reach people across 3 million sites and apps.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget & Bidding */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Budget & Bidding</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Daily Budget
              <Tooltip content="How much you are willing to spend each day on average. Google may spend up to 2x this amount on busy days, but won't exceed your monthly limit." />
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                className="w-full pl-8 p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue focus:border-google-blue outline-none"
                placeholder="10.00"
                value={campaignData.budgetAmount}
                onChange={(e) => updateField('budgetAmount', e.target.value)}
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
              Bidding Strategy
              <Tooltip content="Maximize Clicks tries to get the most traffic. Target CPA tries to get conversions at a specific cost. Manual CPC gives you full control." />
            </label>
            <select
              className="w-full max-w-xs p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue focus:border-google-blue outline-none bg-white"
              value={campaignData.biddingStrategy}
              onChange={(e) => updateField('biddingStrategy', e.target.value)}
            >
              <option value="maximize-clicks">Maximize Clicks</option>
              <option value="maximize-conversions">Maximize Conversions</option>
              <option value="target-cpa">Target CPA</option>
              <option value="manual-cpc">Manual CPC</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full max-w-xs p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
              value={campaignData.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="w-full max-w-xs p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
              value={campaignData.endDate}
              onChange={(e) => updateField('endDate', e.target.value)}
            />
           </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-google-blue text-white font-medium rounded hover:bg-google-blue-hover transition-colors shadow-sm"
        >
          Next: Keywords & Targeting
        </button>
      </div>
    </div>
  );
};

export default CampaignSetup;
