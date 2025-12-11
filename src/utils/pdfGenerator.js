import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

export const generatePDF = async (campaignData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- Title & Header ---
  doc.setFontSize(22);
  doc.setTextColor(26, 115, 232); // Google Blue
  doc.text('Google Ads Campaign Plan', 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 28);
  doc.text(`Student: ${campaignData.studentName || 'N/A'}`, pageWidth - 20, 28, { align: 'right' });

  // --- 1. Strategy Reflection ---
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('1. Strategy & Objectives', 20, 40);

  const splitStrategy = doc.splitTextToSize(campaignData.strategyDescription || 'No strategy provided.', pageWidth - 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(splitStrategy, 20, 50);

  let yPos = 50 + (splitStrategy.length * 5) + 10;

  // --- 2. Campaign Settings (Table) ---
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Campaign Settings', 20, yPos);

  doc.autoTable({
    startY: yPos + 5,
    head: [['Setting', 'Value']],
    body: [
      ['Campaign Name', campaignData.campaignName || '-'],
      ['Budget', `$${campaignData.budgetAmount} (${campaignData.budgetType})`],
      ['Bidding Strategy', campaignData.biddingStrategy],
      ['Networks', Object.keys(campaignData.networks).filter(k => campaignData.networks[k]).join(', ')],
      ['Locations', campaignData.locations.join(', ')],
      ['Duration', `${campaignData.startDate} to ${campaignData.endDate}`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [26, 115, 232] },
    margin: { top: 10, left: 20, right: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 15;

  // --- 3. Targeting & Demographics ---
  doc.text('3. Targeting', 20, yPos);

  const keywordsStr = campaignData.keywords.map(k => {
    if (k.matchType === 'exact') return `[${k.text}]`;
    if (k.matchType === 'phrase') return `"${k.text}"`;
    return k.text;
  }).join(', ');

  const demographicsStr = [
    `Age: ${campaignData.demographics.age.join(', ')}`,
    `Gender: ${campaignData.demographics.gender.join(', ')}`,
    `Income: ${campaignData.demographics.income.join(', ') || 'All'}`
  ].join('\n');

  doc.autoTable({
    startY: yPos + 5,
    body: [
      ['Keywords', keywordsStr || 'None selected'],
      ['Demographics', demographicsStr]
    ],
    theme: 'grid',
    columnStyles: { 0: { fontStyle: 'bold', width: 40 } },
    margin: { left: 20, right: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 15;

  // --- 4. Ad Creative ---
  // If we run out of space, add a page
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Ad Creative', 20, yPos);

  const headlinesStr = campaignData.headlines.join('\n');
  const descriptionsStr = campaignData.descriptions.join('\n');

  doc.autoTable({
    startY: yPos + 5,
    body: [
      ['Final URL', campaignData.finalUrl || '-'],
      ['Headlines', headlinesStr || '-'],
      ['Descriptions', descriptionsStr || '-']
    ],
    theme: 'grid',
    margin: { left: 20, right: 20 },
  });

  // --- Save ---
  doc.save('GoogleAds_Campaign_Plan.pdf');
};
