import React, { createContext, useState, useContext, useEffect } from 'react';

const CampaignContext = createContext();

export const useCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  // Initial State
  const initialState = {
    campaignName: '',
    budgetType: 'daily',
    budgetAmount: '',
    startDate: '',
    endDate: '',
    biddingStrategy: 'maximize-clicks',
    networks: {
      search: true,
      display: false
    },
    locations: ['US'],
    languages: ['en'],

    // Targeting
    keywords: [], // Array of objects { text: string, matchType: string }
    demographics: {
      age: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      gender: ['male', 'female', 'unknown'],
      income: []
    },

    // Ads
    finalUrl: '',
    headlines: [], // Array of strings
    descriptions: [], // Array of strings

    // Meta
    studentName: '',
    strategyDescription: ''
  };

  const [campaignData, setCampaignData] = useState(() => {
    // Load from local storage if available
    const saved = localStorage.getItem('googleAdsSim_v2');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('googleAdsSim_v2', JSON.stringify(campaignData));
  }, [campaignData]);

  const updateField = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addKeyword = (keywordText) => {
    // Basic match type detection
    let matchType = 'broad';
    let cleanText = keywordText.trim();

    if (cleanText.startsWith('"') && cleanText.endsWith('"')) {
      matchType = 'phrase';
      cleanText = cleanText.slice(1, -1);
    } else if (cleanText.startsWith('[') && cleanText.endsWith(']')) {
      matchType = 'exact';
      cleanText = cleanText.slice(1, -1);
    }

    if (!cleanText) return;

    // Prevent duplicates
    if (campaignData.keywords.some(k => k.text === cleanText && k.matchType === matchType)) return;

    setCampaignData(prev => ({
      ...prev,
      keywords: [...prev.keywords, { text: cleanText, matchType, id: Date.now() }]
    }));
  };

  const removeKeyword = (id) => {
    setCampaignData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k.id !== id)
    }));
  };

  return (
    <CampaignContext.Provider value={{ campaignData, updateField, addKeyword, removeKeyword, setCampaignData }}>
      {children}
    </CampaignContext.Provider>
  );
};
