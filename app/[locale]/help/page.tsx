'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

export default function HelpPage() {
  const t = useTranslations('help');

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">{t('title')}</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-plusplus">
              <AccordionTrigger className="text-xl text-primary-navy">{t('questions.whatIs.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.whatIs.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-it-works">
              <AccordionTrigger className="text-xl text-primary-navy">{t('questions.howItWorks.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.howItWorks.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger className="text-xl text-primary-navy">{t('questions.returns.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.returns.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-xl text-primary-navy">{t('questions.security.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.security.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="get-started">
              <AccordionTrigger className="text-xl text-primary-navy">{t('questions.getStarted.question')}</AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-dark leading-relaxed">
                {t('questions.getStarted.answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
