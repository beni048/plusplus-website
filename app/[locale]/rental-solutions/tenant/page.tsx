'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';

export default function RentalSolutionsTenant() {
  const t = useTranslations();
  const locale = useLocale();
  const [emailCopied, setEmailCopied] = useState(false);

  const emailTemplateEn = `Subject: Setting up my rental deposit via Zinsli

Dear [Landlord Name],

I'd like to suggest setting up my rental deposit digitally via Zinsli. This is a modern, paperless solution that offers benefits for both of us.
You can open a rental deposit within a few hours and will receive an immediate email notification when I make my payment. As a tenant, it's convenient for me because I receive automatic reminders and can deposit the security in modern deposit solutions with returns.

If you work with Wincasa, Fairwalter, or Garaio REM, the integration with Zinsli is likely already available in your property management software and you can invite me directly there.
If not, you can simply and quickly register at www.zinsli.com and set up the rental deposit there. You can then invite me directly via the website to make the deposit.

Thank you for making our rental process smoother and more transparent!

Best regards,
[Tenant Name]`;

  const emailTemplateDe = `Betreff: Aufsetzen meiner Mietkaution via Zinsli

Sehr geehrte(r) [Name des Vermieters],

Ich möchte vorschlagen, meine Mietkaution digital über Zinsli abzuwickeln. Das ist eine moderne, papierlose Lösung, die für Sie und mich Vorteile bringt. 
Sie können innert weniger Stunden eine Mietkaution eröffnen und werden bei Eingang meiner Zahlung sofort per E-Mail benachrichtigt. Für mich als Mieter ist es bequem, da ich automatische Erinnerungen erhalte und die Kaution in modernen Kautionslösungen mit Rendite hinterlegen kann. 

Falls Sie mit Wincasa, Fairwalter oder Garaio REM arbeiten, ist die Anbindung an Zinsli vermutlich bereits in Ihrer Verwaltungssoftware integriert und Sie können mich direkt dort einladen. 
Falls nicht, können Sie sich einfach und schnell auf www.zinsli.com registrieren und dort die Mietkaution aufsetzen. Anschliessend können Sie mich direkt über die Webseite zur Hinterlegung einladen.

Vielen Dank, dass Sie unseren Mietprozess reibungsloser und transparenter gestalten!

Freundliche Grüsse,
[Name des Mieters]`;

  const emailTemplate = locale === 'de' ? emailTemplateDe : emailTemplateEn;

  // Locale-specific PDF paths: German (de) vs English (en)
  const factsheetZCHFPdf = locale === 'de'
    ? '/pdfs/Plusplus_Factsheet_ZCHF_Deposit_DE.pdf'
    : '/pdfs/Plusplus_Factsheet_ZCHF_Deposit_EN.pdf';

  const factsheetBTCPdf = locale === 'de'
    ? '/pdfs/Plusplus_Factsheet_BTC_Deposit_DE.pdf'
    : '/pdfs/Plusplus_Factsheet_BTC_Deposit_EN.pdf';

  const renderEmailWithLinks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Replace URLs with clickable links
      const urlRegex = /(www\.zinsli\.com[^\s]*)/g;
      const parts = line.split(urlRegex);

      // Determine if this is an empty line (paragraph break)
      const isEmpty = line.trim() === '';

      return (
        <div key={index} className={isEmpty ? "mb-1" : "mb-1"}>
          {isEmpty ? (
            // Empty line for paragraph separation
            <span>&nbsp;</span>
          ) : (
            // Regular line with content
            parts.map((part, partIndex) => {
              if (urlRegex.test(part)) {
                // If the detected part is exactly 'www.zinsli.com', show custom link text and href
                if (part === 'www.zinsli.com') {
                  return (
                    <a
                      key={partIndex}
                      href="https://app.zinsli.com/de/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      www.zinsli.com
                    </a>
                  );
                }
                // Otherwise, use the detected URL as both text and href
                const fullUrl = part.startsWith('http') ? part : `https://${part}`;
                return (
                  <a
                    key={partIndex}
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {part}
                  </a>
                );
              }
              return part;
            })
          )}
        </div>
      );
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('rentalSolutionsTenant.title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 block sm:hidden">
              {t('rentalSolutionsTenant.subtitle')}
            </p>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 hidden sm:block">
              {t('rentalSolutionsTenant.subtitleFull')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Deposit Calculator Promotion */}
      <section className="bg-accent-red py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-2xl sm:text-3xl font-primary font-medium text-white mb-4">
              {t('rentalSolutionsTenant.calculator.title')}
            </h2>
            <p className="text-lg text-white/90 mb-8 font-secondary">
              {t('rentalSolutionsTenant.calculator.description')}
            </p>
            <Button 
              asChild
              className="bg-white text-accent-red hover:bg-neutral-light px-6 py-3 text-lg transition-all duration-300 font-primary group"
            >
              <Link href="/rental-solutions/tenant/calculator">
                {t('rentalSolutionsTenant.calculator.button')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Frankencoin Stablecoin Product Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Image Right */}
              <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
                <Image
                  src="/images/collection_v2/ricardo-gomez-angel-44EjFu3bies-unsplash.jpg"
                  alt="Frankencoin Stablecoin Deposits"
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-lg"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Discrete photo credit */}
                <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                  Ricardo Gomez Angel
                </div>
              </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button asChild className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary w-full">
                <a
                  href={factsheetZCHFPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('rentalSolutionsTenant.frankencoin.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Text Left */}
            <div className="space-y-6 order-3 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsTenant.frankencoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {(() => {
                  const description = t('rentalSolutionsTenant.frankencoin.description');
                  const parts = description.split('Frankencoin');
                  if (parts.length > 1) {
                    return (
                      <>
                        {parts[0]}
                        <a 
                          href="https://frankencoin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent-red hover:underline transition-all duration-300"
                        >
                          Frankencoin
                        </a>
                        {parts.slice(1).join('Frankencoin')}
                      </>
                    );
                  }
                  return description;
                })()}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.stability')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.transparency')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.settlement')}</span>
                </li>
                {/* Removed extra bullet point for Frankencoin */}
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <Button asChild className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                  <a
                    href={factsheetZCHFPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('rentalSolutionsTenant.frankencoin.cta')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin Rental Deposit Product Section */}
      <section className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Image Left */}
              <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
                <Image
                  src="/images/collection_v2/kanchanara-7E3QGntO66M-unsplash.jpg"
                  alt="Bitcoin Rental Deposits"
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-lg"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Discrete photo credit */}
                <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                  Kanchanara
                </div>
              </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button asChild className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary w-full">
                <a
                  href={factsheetBTCPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('rentalSolutionsTenant.bitcoin.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-3 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsTenant.bitcoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsTenant.bitcoin.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.appreciation')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.escrow')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.accessibility')}</span>
                </li>
                {/* Removed extra bullet point for Bitcoin */}
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <Button asChild className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                  <a
                    href={factsheetBTCPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('rentalSolutionsTenant.bitcoin.cta')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Template Section */}
      <section id="email-template" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center">
              {t('rentalSolutionsTenant.emailTemplate.title')}
            </h2>
            <p className="text-lg text-neutral-dark mb-8 text-center">
              {t('rentalSolutionsTenant.emailTemplate.description')}
            </p>
            
            {/* Copy Button Above Email */}
            <div className="flex justify-end mb-3">
              <button
                onClick={copyToClipboard}
                className="bg-accent-red text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-red/90 transition-colors"
              >
                {emailCopied ? t('rentalSolutionsTenant.emailTemplate.copied') : t('rentalSolutionsTenant.emailTemplate.copy')}
              </button>
            </div>
            
            {/* Email Content Box */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
              <div className="text-sm text-neutral-dark font-mono leading-relaxed whitespace-pre-wrap">
                {renderEmailWithLinks(emailTemplate)}
              </div>
            </div>

            <div className="text-center">
              <a
                href="https://zinsli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-red text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-red/90 transition-all duration-300 rounded-lg inline-block font-medium"
              >
                {t('rentalSolutionsTenant.emailTemplate.button')}
              </a>
              <p className="text-sm text-neutral-dark mt-4">
                {t('rentalSolutionsTenant.emailTemplate.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
