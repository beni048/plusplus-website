import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormValues, PersonSchemaType } from '@/components/forms/schema';

// --- Types for Contract PDF ---
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

// --- Types for Onboarding PDF ---
type FileMap = { [key: string]: File[] };


// ==========================================
// Contract Query PDF Generator
// ==========================================
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


// ==========================================
// Onboarding Form PDF Generator
// ==========================================
export const generateOnboardingPDF = (data: FormValues, files: FileMap): jsPDF => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text("Client On-boarding Data", 20, y);
    y += 15;

    doc.setFontSize(12);

    const addLine = (label: string, value: string | undefined | number | null) => {
        if (value !== undefined && value !== null && value !== "") {
            // handle long strings
            const strValue = String(value);
            const splitText = doc.splitTextToSize(`${label}: ${strValue}`, 170); // 170mm max width

            // Check page break for each line
            if (y + (splitText.length * 5) > 280) {
                doc.addPage();
                y = 20;
            }

            doc.text(splitText, 20, y);
            y += (splitText.length * 5) + 5;
        }
    };

    const addSectionHeader = (title: string) => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        y += 5;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, 20, y);
        doc.setFont("helvetica", "normal");
        y += 10;
        doc.setFontSize(12);
    };

    const addPersonDetails = (label: string, person: PersonSchemaType | undefined | null) => {
        if (person && person.fullName) {
            addSectionHeader(label);
            addLine("Name", person.fullName);
            const address = `${person.street || ''}, ${person.houseNumber || ''}, ${person.zipCode || ''} ${person.city || ''}, ${person.country || ''}`;
            addLine("Address", address);
            addLine("DOB", person.dateOfBirth);
            addLine("Nationality", person.nationality);
        }
    };

    const addPersonList = (title: string, list: PersonSchemaType[] | undefined | null) => {
        if (list && list.length > 0) {
            addSectionHeader(title);
            list.forEach((person, index) => {
                addLine(`#${index + 1} Name`, person.fullName);
                const address = `${person.street || ''}, ${person.houseNumber || ''}, ${person.zipCode || ''} ${person.city || ''}, ${person.country || ''}`;
                addLine(`   Address`, address);
                addLine(`   DOB`, person.dateOfBirth);
                addLine(`   Nationality`, person.nationality);
                y += 5;
            });
        }
    };

    addLine("Entity Type", data.entityType === 'natural_person' ? 'Natural Person' : 'Legal Entity');

    if (data.entityType === 'natural_person') {
        addSectionHeader("Personal Information");
        addLine("First Name", data.firstName);
        addLine("Last Name", data.lastName);
        addLine("Date of Birth", data.dateOfBirth);
        addLine("Nationality", data.nationality);
        addLine("Email", data.email);
        addLine("Phone", data.phone);
        addLine("Address", `${data.street}, ${data.zipCode} ${data.city}, ${data.country}`);

        // AML Profile - Natural Person
        if (data.amlProfile) {
            addSectionHeader("AML Profile");
            addLine("Profession", data.amlProfile.profession);
            addLine("Estimated Income", data.amlProfile.estimatedIncome);
            addLine("Estimated Wealth", data.amlProfile.estimatedWealth);
            addLine("Estimated Liabilities", data.amlProfile.estimatedLiabilities);

            if (data.amlProfile.originOfAssets) {
                addLine("Origin of Assets Category", data.amlProfile.originOfAssets.category === 'other' ? data.amlProfile.originOfAssets.otherExplanation : data.amlProfile.originOfAssets.category);
            }
            if (data.amlProfile.relationshipPurpose) {
                addLine("Relationship Purpose", data.amlProfile.relationshipPurpose.type === 'other' ? data.amlProfile.relationshipPurpose.otherDetails : data.amlProfile.relationshipPurpose.type);
            }
            addLine("Planned Tx Volume", data.amlProfile.plannedTransactionVolume);
            if (data.amlProfile.thirdPartyRelations) {
                addLine("Third Party Relations", data.amlProfile.thirdPartyRelations.type === 'other' ? data.amlProfile.thirdPartyRelations.otherDetails : data.amlProfile.thirdPartyRelations.type);
            }
        }



    } else {
        // Opener Details
        addSectionHeader("Opener Details");
        addLine("First Name", data.openerFirstName);
        addLine("Last Name", data.openerLastName);
        addLine("Function", data.openerFunction);
        addLine("Date of Birth", data.openerDateOfBirth);
        addLine("Nationality", data.openerNationality);
        addLine("Address", `${data.openerStreet || ''}, ${data.openerHouseNumber || ''}, ${data.openerZipCode || ''} ${data.openerCity || ''}, ${data.openerCountry || ''}`);

        addLine("Authorized Signatory", data.isOpenerAuthorizedSignatory);

        if (data.isOpenerAuthorizedSignatory === 'no') {
            if (data.numberOfSignatories) addLine("Number of Signatories needed", data.numberOfSignatories);
            if (data.authorizedSignatory1?.fullName) {
                addSectionHeader("Authorized Signatory 1");
                addLine("Name", data.authorizedSignatory1.fullName);
                addLine("DOB", data.authorizedSignatory1.dateOfBirth);
                addLine("Nationality", data.authorizedSignatory1.nationality);
            }
            if (data.authorizedSignatory2?.fullName) {
                addSectionHeader("Authorized Signatory 2");
                addLine("Name", data.authorizedSignatory2.fullName);
                addLine("DOB", data.authorizedSignatory2.dateOfBirth);
                addLine("Nationality", data.authorizedSignatory2.nationality);
            }
        } else if (data.isOpenerAuthorizedSignatory === 'yes') {
            if (data.hasSecondSignatory === 'yes' && data.authorizedSignatory2?.fullName) {
                addSectionHeader("Authorized Signatory 2");
                addLine("Name", data.authorizedSignatory2.fullName);
                addLine("DOB", data.authorizedSignatory2.dateOfBirth);
                addLine("Nationality", data.authorizedSignatory2.nationality);
            }
        }

        // Company Info
        addSectionHeader("Company Information");
        addLine("Company Name", data.companyName);
        addLine("Commercial Register", data.commercialRegisterNumber);
        addLine("Date of Incorporation", data.dateOfIncorporation);
        addLine("Domicile Address", `${data.domicileStreet || ''}, ${data.domicileHouseNumber || ''}, ${data.domicileZipCode || ''} ${data.domicileCity || ''}, ${data.domicileCountry || ''}`);

        const typeLabel = data.legalEntityType === 'operative_company' ? 'Operative Company' :
            data.legalEntityType === 'domiciliary_company' ? 'Domiciliary Company' :
                data.legalEntityType === 'foundation' ? 'Foundation' :
                    data.legalEntityType === 'trust' ? 'Trust' : data.legalEntityType;
        addLine("Legal Entity Type", typeLabel);

        if (data.detailedBusinessActivity) {
            addLine("Detailed Business Activity", data.detailedBusinessActivity.type === 'other' ? data.detailedBusinessActivity.otherDetails : data.detailedBusinessActivity.type);
        }
        if (data.sourceOfFunds) {
            addLine("Source of Funds", data.sourceOfFunds.type === 'other' ? data.sourceOfFunds.otherDetails : data.sourceOfFunds.type);
        }

        if (data.legalEntityType === 'operative_company' || data.legalEntityType === 'domiciliary_company') {
            if (data.legalEntityType === 'operative_company') {
                addLine("Has Owners > 25%", data.hasOwnersMoreThan25Percent);
                if (data.hasOwnersMoreThan25Percent === 'yes') {
                    addPersonList("Owners > 25%", data.ownersMoreThan25Percent);
                } else if (data.hasOwnersMoreThan25Percent === 'no') {
                    addPersonList("Managing Directors", data.managingDirectors);
                }
            } else {
                // Domiciliary
                addPersonList("Managing Directors", data.managingDirectors);
                addPersonList("Economic Beneficiaries", data.economicBeneficiaries);
            }
        } else if (data.legalEntityType === 'foundation') {
            addSectionHeader("Foundation Details");
            addLine("Type", data.foundationType);
            addLine("Revocable", data.isFoundationRevocable);
            addPersonDetails("Founder", data.founder);
            addLine("Is Founder Deceased", data.isFounderDeceased);
            addPersonList("Foundation Board Members", data.foundationBoardMembers);
            addPersonList("Foundation Beneficiaries", data.foundationBeneficiaries);
            addLine("Beneficiaries Fixed Claim", data.foundationBeneficiariesFixedClaim);
            addPersonList("Nomination Rights", data.nominationRights);
        } else if (data.legalEntityType === 'trust') {
            addSectionHeader("Trust Details");
            addLine("Type", data.trustType);
            addLine("Revocable", data.isTrustRevocable);
            addPersonDetails("Settlor", data.settlor);
            addLine("Is Settlor Deceased", data.isSettlorDeceased);
            addPersonDetails("Trustee", data.trustee);
            addPersonDetails("Protector", data.protector);
            addPersonList("Trust Beneficiaries", data.trustBeneficiaries);
            addLine("Beneficiaries Fixed Claim", data.trustBeneficiariesFixedClaim);
        }


    }

    // List attached files
    y += 5;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Attached Files", 20, y);
    doc.setFont("helvetica", "normal");
    y += 10;
    doc.setFontSize(12);
    Object.entries(files).forEach(([key, fileList]) => {
        if (fileList.length > 0) {
            addLine(key, fileList.map(f => f.name).join(', '));
        }
    });

    return doc;
};
