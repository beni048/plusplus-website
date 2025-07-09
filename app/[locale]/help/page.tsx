'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations, useLocale } from 'next-intl';

export default function HelpPage() {
  const t = useTranslations('help');
  const locale = useLocale();

  const SupportAnswer = () => {
    if (locale === 'de') {
      return (
        <div className="text-lg text-neutral-dark leading-relaxed">
          Der Einstieg ist einfach! Für Mieter: Kontaktieren Sie Ihren Vermieter und bitten Sie ihn, den Prozess mit{' '}
          <a 
            href="https://zinsli.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-black underline hover:text-accent-orange transition-colors"
          >
            Zinsli
          </a>{' '}
          zu initiieren, um unsere WBTC- und ZCHF-basierten Kautionsprodukte für Ihre Mietkaution zu nutzen. Für Vermieter: Wenden Sie sich direkt an Zinsli, um diese innovativen Kautionslösungen Ihren Mietern anzubieten. Benötigen Sie Hilfe bei der Verbindung mit Zinsli oder haben Fragen? Unser Schweizer Team hilft gerne. Kontaktieren Sie uns unter{' '}
          <a 
            href="mailto:hello@plusplus.swiss" 
            className="text-black underline hover:text-accent-orange transition-colors"
          >
            hello@plusplus.swiss
          </a>{' '}
          oder über das Kontaktformular unserer Website.
        </div>
      );
    }

    return (
      <div className="text-lg text-neutral-dark leading-relaxed">
        Getting started is easy! For tenants: Contact your landlord and ask them to initiate the process with{' '}
        <a 
          href="https://zinsli.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-black underline hover:text-accent-orange transition-colors"
        >
          Zinsli
        </a>{' '}
        to use our WBTC and ZCHF-based deposit products for your rental deposit. For landlords: Reach out to Zinsli directly to offer these innovative deposit solutions to your tenants. Need assistance connecting with Zinsli or have questions? Our Swiss-based team is here to help. Contact us at{' '}
        <a 
          href="mailto:hello@plusplus.swiss" 
          className="text-black underline hover:text-accent-orange transition-colors"
        >
          hello@plusplus.swiss
        </a>{' '}
        or through our website contact form.
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-medium text-black">{t('title')}</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-plusplus">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.whatIs.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.whatIs.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.products.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.products.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-it-works">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.howItWorks.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.howItWorks.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="benefits">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.benefits.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.benefits.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.security.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.security.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="risks">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.risks.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.risks.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.access.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.access.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="regulation">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.regulation.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.regulation.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.privacy.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.privacy.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="text-xl text-black text-left">{t('questions.support.question')}</AccordionTrigger>
              <AccordionContent>
                <SupportAnswer />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
