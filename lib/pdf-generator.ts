import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ContractData {
    depositDate: string;
    principal: string;
    timeSinceDeposit: string;
    currentValue: string;
    gain: string;
    gainPercentage: string;
    bitcoinAmount?: string; // Only for WBTC
    bitcoinPrice?: string; // Only for WBTC
}

interface PdfTranslations {
    title: string;
    customerNumber: string;
    date: string;
    depositDate: string;
    principal: string;
    timeSinceDeposit: string;
    currentValue: string;
    gainSinceDeposit: string;
    bitcoinAmount: string;
    bitcoinPrice: string;
    metric: string;
    value: string;
    generatedBy: string;
}

export const generateContractPdf = async (
    type: 'zchf' | 'wbtc',
    customerNumber: string,
    data: ContractData,
    translations: PdfTranslations,
    locale: string
) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // -- Header --
    // Logo
    // We'll use the public URL for the logo. 
    // Note: For client-side PDF generation, fetching the image might be needed if cross-origin issues arise,
    // but for a local public asset it should work if we convert it to base64 or if jspdf handles it.
    // A robust way is to load it into an HTMLImageElement first or fetch it.
    // For simplicity, let's try adding it directly. If it fails, we might need a base64 string.
    const logoUrl = '/images/logo_plusplus.png';

    // Fetch the image to get original data and avoid canvas re-encoding bloat
    try {
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64data = reader.result as string;

            // Add Logo
            // Calculate aspect ratio if possible, or use fixed dimensions. 
            // Since we don't have the image object to get width/height immediately, 
            // we can create an offscreen image to get dimensions OR just assume a standard ratio if known.
            // Better: Load it into an image to get dimensions, BUT use the base64 data for addImage.
            const img = new Image();
            img.src = base64data;
            img.onload = () => {
                let finalData = base64data;
                let finalWidth = img.width;
                let finalHeight = img.height;

                // Resize image if it's too large (to avoid 12MB+ PDFs due to raw pixel embedding)
                const MAX_WIDTH = 600;
                if (img.width > MAX_WIDTH) {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            const scale = MAX_WIDTH / img.width;
                            finalWidth = MAX_WIDTH;
                            finalHeight = img.height * scale;

                            canvas.width = finalWidth;
                            canvas.height = finalHeight;

                            ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
                            finalData = canvas.toDataURL('image/png');
                        }
                    } catch (e) {
                        console.warn('Failed to resize image, using original:', e);
                    }
                }

                const logoWidth = 40;
                const logoHeight = (finalHeight / finalWidth) * logoWidth;

                // Use the (potentially resized) base64 data
                doc.addImage(finalData, 'PNG', 14, 10, logoWidth, logoHeight);

                // Add Address (Right aligned)
                doc.setFontSize(10);
                doc.setTextColor(100);
                const addressLines = [
                    'Plusplus AG',
                    'Poststrasse 22',
                    '6300 Zug',
                    'Switzerland',
                    'info@plusplus.swiss'
                ];

                let yPos = 15;
                addressLines.forEach(line => {
                    doc.text(line, pageWidth - 14, yPos, { align: 'right' });
                    yPos += 5;
                });

                // -- Title & Info --
                yPos = 50;
                doc.setFontSize(18);
                doc.setTextColor(0);
                doc.text(translations.title, 14, yPos);

                yPos += 10;
                doc.setFontSize(12);
                doc.setTextColor(60);
                doc.text(`${translations.customerNumber}: ${customerNumber}`, 14, yPos);

                yPos += 6;
                const date = new Date().toLocaleDateString(locale === 'de' ? 'de-CH' : 'en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                doc.text(`${translations.date}: ${date}`, 14, yPos);

                // -- Results Table --
                yPos += 15;

                const tableBody = [
                    [translations.depositDate, data.depositDate],
                    [translations.principal, `${data.principal} CHF`],
                    [translations.timeSinceDeposit, data.timeSinceDeposit],
                    [translations.currentValue, `${data.currentValue} CHF`],
                    [translations.gainSinceDeposit, `${data.gain} CHF (${data.gainPercentage}%)`]
                ];

                if (type === 'wbtc' && data.bitcoinAmount) {
                    tableBody.splice(4, 0, [translations.bitcoinAmount, `${data.bitcoinAmount} BTC`]);
                    if (data.bitcoinPrice) {
                        tableBody.splice(5, 0, [translations.bitcoinPrice, `${data.bitcoinPrice} CHF`]);
                    }
                }

                autoTable(doc, {
                    startY: yPos,
                    head: [[translations.metric, translations.value]],
                    body: tableBody,
                    theme: 'grid',
                    headStyles: { fillColor: [0, 0, 0], textColor: 255 },
                    styles: { fontSize: 11, cellPadding: 5 },
                    columnStyles: {
                        0: { fontStyle: 'bold', cellWidth: 80 },
                        1: { halign: 'right' }
                    }
                });

                // -- Footer --
                const pageCount = doc.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(8);
                    doc.setTextColor(150);
                    doc.text(`${translations.generatedBy} - https://plusplus.swiss`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
                }

                // Save PDF
                doc.save(`plusplus_report_${type}_${customerNumber}.pdf`);
            };
        };
        reader.readAsDataURL(blob);

    } catch (error) {
        console.error('Error loading logo:', error);
        // Fallback without logo
        doc.setFontSize(20);
        doc.text('Plusplus AG', 14, 20);
        doc.save(`plusplus_report_${type}_${customerNumber}.pdf`);
    }
};
