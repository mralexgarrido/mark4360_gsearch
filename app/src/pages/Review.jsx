import React from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { generatePDF } from '../utils/pdfGenerator';
import { FileText, Download, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const { campaignData, updateField } = useCampaign();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="bg-blue-50 border-l-4 border-google-blue p-4 rounded-r">
        <div className="flex">
          <div className="flex-shrink-0">
            <FileText className="h-5 w-5 text-google-blue" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Ready to submit?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Review your campaign details below. When you are satisfied, download the PDF report to submit for your assignment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Final Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              required
              className="w-full max-w-md p-2 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
              value={campaignData.studentName}
              onChange={(e) => updateField('studentName', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Strategy Description</label>
            <textarea
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-google-blue outline-none"
              value={campaignData.strategyDescription}
              onChange={(e) => updateField('strategyDescription', e.target.value)}
              placeholder="Explain your choices. Why did you choose these keywords? Who is your target audience?"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          title="Campaign Settings"
          onEdit={() => navigate('/campaign')}
        >
          <ul className="text-sm space-y-2 text-gray-600">
            <li><strong className="text-gray-900">Name:</strong> {campaignData.campaignName}</li>
            <li><strong className="text-gray-900">Budget:</strong> ${campaignData.budgetAmount} ({campaignData.budgetType})</li>
            <li><strong className="text-gray-900">Strategy:</strong> {campaignData.biddingStrategy}</li>
          </ul>
        </SummaryCard>

        <SummaryCard
          title="Targeting"
          onEdit={() => navigate('/targeting')}
        >
           <ul className="text-sm space-y-2 text-gray-600">
            <li><strong className="text-gray-900">Keywords:</strong> {campaignData.keywords.length} selected</li>
            <li><strong className="text-gray-900">Locations:</strong> {campaignData.locations.join(', ')}</li>
            <li><strong className="text-gray-900">Demographics:</strong> {campaignData.demographics.age.length} age groups</li>
          </ul>
        </SummaryCard>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center pl-64"> {/* pl-64 to offset sidebar */}
           <div className="text-sm text-gray-500">
             {(!campaignData.studentName || !campaignData.strategyDescription) && (
               <span className="text-red-500 flex items-center">
                 <AlertIcon /> Complete details above to download
               </span>
             )}
           </div>
           <button
             onClick={() => generatePDF(campaignData)}
             disabled={!campaignData.studentName || !campaignData.strategyDescription}
             className={`flex items-center px-8 py-3 rounded font-medium shadow-md transition-all ${
               (!campaignData.studentName || !campaignData.strategyDescription)
                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 : 'bg-google-blue text-white hover:bg-google-blue-hover'
             }`}
           >
             <Download className="w-5 h-5 mr-2" />
             Download PDF Report
           </button>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, children, onEdit }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-google-blue transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <button onClick={onEdit} className="text-gray-400 hover:text-google-blue opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit className="w-4 h-4" />
      </button>
    </div>
    {children}
  </div>
);

const AlertIcon = () => (
  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default Review;
