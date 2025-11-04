'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Download } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('terms');
  const locale = useLocale();

  const downloadPDF = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/pdfs/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-3xl sm:text-4xl lg:text-5xl font-primary font-medium text-black px-4">
            {t('title')}
          </h1>
          
          <div className="px-4">
            
            {/* PDF Download Buttons - Only show for German */}
            {locale === 'de' && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-primary font-semibold text-black mb-4">
                  {t('pdfDownload.title')}
                </h2>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => downloadPDF('202509_Plusplus_AGB.pdf')}
                    className="inline-flex items-center px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors font-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('pdfDownload.agb')}
                  </button>
                  <button
                    onClick={() => downloadPDF('202509_Plusplus_AGB_Zusatz.pdf')}
                    className="inline-flex items-center px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors font-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('pdfDownload.agbZusatz')}
                  </button>
                </div>
              </div>
            )}

            {/* Legal Disclaimer for English */}
            {locale === 'en' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 font-secondary">
                      <strong className="font-primary">Legal Notice:</strong> {t('disclaimer')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              
              {/* AGB Sections */}
              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.general.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.general.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.general.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.general.text3')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.contractSubject.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.contractSubject.intro')}</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li className="font-secondary text-justify">{t('agb.contractSubject.requirement1')}</li>
                    <li className="font-secondary text-justify">{t('agb.contractSubject.requirement2')}</li>
                    <li className="font-secondary text-justify">{t('agb.contractSubject.requirement3')}</li>
                  </ul>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text4')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text5')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text6')}</p>
                  <p className="font-secondary text-justify">{t('agb.contractSubject.text7')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.orderProcessing.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.orderProcessing.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.orderProcessing.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.orderProcessing.text3')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.dataProtection.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.dataProtection.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.dataProtection.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.dataProtection.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.dataProtection.text4')}</p>
                  <p className="font-secondary text-justify">{t('agb.dataProtection.text5')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.serviceOutsourcing.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.serviceOutsourcing.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.dataProcessing.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.dataProcessing.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.intellectualProperty.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.intellectualProperty.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.customerDuties.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.customerDuties.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.customerDuties.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.customerDuties.text3')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.indemnification.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.indemnification.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.riskDisclosure.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.riskDisclosure.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.riskDisclosure.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.riskDisclosure.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.riskDisclosure.text4')}</p>
                  <p className="font-secondary text-justify">{t('agb.riskDisclosure.text5')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.liability.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.liability.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.liability.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.liability.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.liability.text4')}</p>
                  <p className="font-secondary text-justify">{t('agb.liability.text5')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.providedInformation.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.providedInformation.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.providedInformation.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.providedInformation.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.providedInformation.text4')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.termination.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.termination.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.termination.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.termination.text3')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.amendments.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.amendments.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.fees.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.fees.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.fees.text2')}</p>
                  <p className="font-secondary text-justify">{t('agb.fees.text3')}</p>
                  <p className="font-secondary text-justify">{t('agb.fees.text4')}</p>
                  <p className="font-secondary text-justify">{t('agb.fees.text5')}</p>
                  <p className="font-secondary text-justify">{t('agb.fees.text6')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.communication.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.communication.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.communication.text2')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.severability.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.severability.text1')}</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                  {t('agb.jurisdiction.title')}
                </h2>
                <div className="space-y-4 text-neutral-dark leading-relaxed">
                  <p className="font-secondary text-justify">{t('agb.jurisdiction.text1')}</p>
                  <p className="font-secondary text-justify">{t('agb.jurisdiction.text2')}</p>
                </div>
              </section>

              {/* AGB Effective Date */}
              <div className="mb-12 text-right">
                <p className="text-sm text-gray-600 font-secondary italic">
                  {t('agb.effective.title')}
                </p>
              </div>

              {/* Special Conditions Section */}
              <div className="border-t-2 border-gray-200 pt-12 mt-12">
                <h1 className="text-3xl font-primary font-bold text-black mb-8">
                  {t('specialConditions.title')}
                </h1>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.general.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.general.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.general.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.general.text3')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.deposit.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.intro')}</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li className="font-secondary text-justify">{t('specialConditions.deposit.requirement1')}</li>
                      <li className="font-secondary text-justify">{t('specialConditions.deposit.requirement2')}</li>
                      <li className="font-secondary text-justify">{t('specialConditions.deposit.requirement3')}</li>
                    </ul>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text3')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text4')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text5')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.deposit.text6')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.losses.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.losses.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.losses.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.losses.text3')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.losses.text4')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.duration.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.duration.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.duration.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.duration.text3')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.duration.text4')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.dissolution.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text3')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text4')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text5')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.dissolution.text6')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.specialFees.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.specialFees.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.specialFees.text2')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.specialFees.text3')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.specialFees.text4')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.specialSeverability.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.specialSeverability.text1')}</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-primary font-semibold text-black mb-4">
                    {t('specialConditions.specialJurisdiction.title')}
                  </h2>
                  <div className="space-y-4 text-neutral-dark leading-relaxed">
                    <p className="font-secondary text-justify">{t('specialConditions.specialJurisdiction.text1')}</p>
                    <p className="font-secondary text-justify">{t('specialConditions.specialJurisdiction.text2')}</p>
                  </div>
                </section>

                {/* Special Conditions Effective Date */}
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-secondary italic">
                    {t('specialConditions.specialEffective.title')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}