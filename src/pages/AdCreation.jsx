import React, { useState } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { useNavigate } from 'react-router-dom';
import AdStrength from '../components/AdStrength';
import { AdPreview } from '../components/AdPreview';
import { Plus, Trash2, Smartphone, Monitor } from 'lucide-react';

const AdCreation = () => {
  const { campaignData, updateField } = useCampaign();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('headlines'); // headlines | descriptions
  const [previewDevice, setPreviewDevice] = useState('mobile');

  const addAsset = (type, value) => {
    if (!value.trim()) return;
    const current = campaignData[type];
    updateField(type, [...current, value]);
  };

  const removeAsset = (type, index) => {
    const current = campaignData[type];
    const newAssets = [...current];
    newAssets.splice(index, 1);
    updateField(type, newAssets);
  };

  const handleNext = () => navigate('/review');

  // Local state for inputs
  const [headlineInput, setHeadlineInput] = useState('');
  const [descInput, setDescInput] = useState('');

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in h-[calc(100vh-140px)]">
      {/* Left: Inputs (Scrollable) */}
      <div className="flex-1 overflow-y-auto pr-2 pb-20">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Create Your Ad</h2>

        {/* Final URL */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Final URL</label>
          <input
            type="url"
            className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue focus:border-google-blue outline-none"
            placeholder="https://www.example.com"
            value={campaignData.finalUrl}
            onChange={(e) => updateField('finalUrl', e.target.value)}
          />
        </div>

        {/* Assets */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <h3 className="text-lg font-medium text-gray-900 mb-4">Headlines</h3>
           <p className="text-sm text-gray-500 mb-4">Add up to 15 headlines. Google will show the best combinations.</p>

           <div className="space-y-3 mb-4">
             {campaignData.headlines.map((h, i) => (
               <div key={i} className="flex gap-2">
                 <input
                   type="text"
                   value={h}
                   readOnly
                   className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-700"
                 />
                 <button onClick={() => removeAsset('headlines', i)} className="text-gray-400 hover:text-red-500">
                   <Trash2 className="w-5 h-5" />
                 </button>
               </div>
             ))}
           </div>

           {campaignData.headlines.length < 15 && (
             <div className="flex gap-2">
               <input
                 type="text"
                 className="flex-1 p-3 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
                 placeholder="Enter a headline (30 chars max)"
                 maxLength={30}
                 value={headlineInput}
                 onChange={(e) => setHeadlineInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     addAsset('headlines', headlineInput);
                     setHeadlineInput('');
                   }
                 }}
               />
               <button
                 onClick={() => {
                    addAsset('headlines', headlineInput);
                    setHeadlineInput('');
                 }}
                 className="bg-google-blue text-white px-4 rounded hover:bg-google-blue-hover"
               >
                 <Plus className="w-5 h-5" />
               </button>
             </div>
           )}
           <div className="text-right text-xs text-gray-400 mt-1">{headlineInput.length}/30</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
           <h3 className="text-lg font-medium text-gray-900 mb-4">Descriptions</h3>
           <p className="text-sm text-gray-500 mb-4">Add up to 4 descriptions.</p>

           <div className="space-y-3 mb-4">
             {campaignData.descriptions.map((d, i) => (
               <div key={i} className="flex gap-2">
                 <input
                   type="text"
                   value={d}
                   readOnly
                   className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-700"
                 />
                 <button onClick={() => removeAsset('descriptions', i)} className="text-gray-400 hover:text-red-500">
                   <Trash2 className="w-5 h-5" />
                 </button>
               </div>
             ))}
           </div>

           {campaignData.descriptions.length < 4 && (
             <div className="flex gap-2">
               <input
                 type="text"
                 className="flex-1 p-3 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
                 placeholder="Enter a description (90 chars max)"
                 maxLength={90}
                 value={descInput}
                 onChange={(e) => setDescInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     addAsset('descriptions', descInput);
                     setDescInput('');
                   }
                 }}
               />
               <button
                 onClick={() => {
                    addAsset('descriptions', descInput);
                    setDescInput('');
                 }}
                 className="bg-google-blue text-white px-4 rounded hover:bg-google-blue-hover"
               >
                 <Plus className="w-5 h-5" />
               </button>
             </div>
           )}
           <div className="text-right text-xs text-gray-400 mt-1">{descInput.length}/90</div>
        </div>

        <div className="flex justify-between pt-6">
            <button
              onClick={() => navigate('/targeting')}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-google-blue text-white font-medium rounded hover:bg-google-blue-hover transition-colors shadow-sm"
            >
              Next: Review
            </button>
        </div>
      </div>

      {/* Right: Preview & Score (Sticky) */}
      <div className="w-full lg:w-[400px] flex-shrink-0 space-y-6">
        <AdStrength />

        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Preview</h3>
            <div className="flex bg-gray-200 rounded p-1">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={`${previewDevice === 'mobile' ? 'w-[300px]' : 'w-full'} mx-auto transition-all duration-300`}>
             <AdPreview
               finalUrl={campaignData.finalUrl}
               headlines={campaignData.headlines}
               descriptions={campaignData.descriptions}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCreation;
