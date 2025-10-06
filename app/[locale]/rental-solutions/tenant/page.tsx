'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import DepositCalculator from '../../../../components/DepositCalculator';

export default function RentalSolutionsTenant() {
  const t = useTranslations();
  const locale = useLocale();
  const [emailCopied, setEmailCopied] = useState(false);

  const emailTemplateEn = `Subject: Quick, Free Rental-Deposit Solution

Dear [Landlord Name],

I heard from a friend that there's a new, quick, and free tool called Zinsli for setting up rental deposits—and I'd love to give it a try for our lease. Here's why it's great for both of us:

• It takes under 5 minutes to set up—no more snail-mail or lengthy bank processes
• I get automated reminders, so I'll never miss a deposit payment
• You receive instant email confirmation as soon as the deposit arrives
• There are no fees for you as the landlord

Could you please set up a free account at https://app.zinsli.com/en/signup and invite me? You can learn more about the process here: https://pafinance.live/en/rental-solutions/landlord

It's simple: sign up, click "Invite Tenant," and enter my email. Then I'll complete my side right away.

Thank you for making our rental process smoother and more transparent!

Best regards,
[Tenant Name]`;

  const emailTemplateDe = `Betreff: Schnelle, kostenlose Mietkautions-Lösung

Sehr geehrte/r [Name des Vermieters],

Ich habe von einem Freund gehört, dass es ein neues, schnelles und kostenloses Tool namens Zinsli für die Einrichtung von Mietkautionen gibt—und ich würde es gerne für unseren Mietvertrag ausprobieren. Hier ist, warum es für uns beide grossartig ist:

• Die Einrichtung dauert unter 5 Minuten—keine Briefpost oder langwierige Bankprozesse mehr
• Ich erhalte automatische Erinnerungen, damit ich niemals eine Kautionszahlung verpasse
• Sie erhalten sofortige E-Mail-Bestätigung, sobald die Kaution ankommt
• Es fallen keine Gebühren für Sie als Vermieter an

Könnten Sie bitte ein kostenloses Konto unter  https://app.zinsli.com/de/signup erstellen und mich einladen? Hier können Sie mehr über den Prozess erfahren: https://pafinance.live/de/rental-solutions/landlord

Es ist einfach: Registrieren Sie sich, klicken Sie auf "Mieter einladen" und geben Sie meine E-Mail-Adresse ein. Dann erledige ich sofort meinen Teil.

Vielen Dank, dass Sie unseren Mietprozess reibungsloser und transparenter gestalten!

Freundliche Grüsse,
[Name des Mieters]`;

  const emailTemplate = locale === 'de' ? emailTemplateDe : emailTemplateEn;

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
          <div className="text-center mb-16">
            <h1 className="mb-12 text-center text-4xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('rentalSolutionsTenant.title')}
            </h1>
            <p className="text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
              {t('rentalSolutionsTenant.subtitle')}
            </p>
          </div>
          
          {/* Deposit Calculator Section */}
          <div className="mb-16">
            <DepositCalculator />
          </div>
        </div>
      </div>
      
      {/* Frankencoin Stablecoin Product Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Left */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsTenant.frankencoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsTenant.frankencoin.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.stability')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.transparency')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.settlement')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.frankencoin.benefits.fees')}</span>
                </li>
              </ul>
            </div>
            
            {/* Image Right */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
              <Image
                src="/images/collection/nicolas-peyrol-iWacqnogqO4-unsplash.webp"
                alt="Frankencoin Stablecoin Deposits"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin Rental Deposit Product Section */}
      <section className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection/thomas-aubaud-7plmm5fLuas-unsplash.webp"
                alt="Bitcoin Rental Deposits"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-2 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsTenant.bitcoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsTenant.bitcoin.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.appreciation')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.escrow')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.accessibility')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsTenant.bitcoin.benefits.banking')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Email Template Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center">
              {t('rentalSolutionsTenant.emailTemplate.title')}
            </h2>
            <p className="text-lg text-neutral-dark mb-8 text-center">
              {t('rentalSolutionsTenant.emailTemplate.description')}
            </p>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 relative">
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 bg-accent-orange text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-orange/90 transition-colors"
              >
                {emailCopied ? t('rentalSolutionsTenant.emailTemplate.copied') : t('rentalSolutionsTenant.emailTemplate.copy')}
              </button>
              <pre className="whitespace-pre-wrap text-sm text-neutral-dark font-mono leading-relaxed pr-24">
                {emailTemplate}
              </pre>
            </div>

            <div className="text-center">
              <a
                href="https://zinsli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
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
