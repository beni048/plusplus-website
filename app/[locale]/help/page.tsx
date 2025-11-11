'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations, useLocale } from 'next-intl';
import Script from 'next/script';
import { Metadata } from 'next';

/* Note: metadata for this route is provided by a server-side layout to keep this page a client component. */

function SupportAnswer() {
  const locale = useLocale();
  if (locale === 'de') {
    return (
      <div className="text-lg text-neutral-dark leading-relaxed">
        Der Einstieg ist einfach! Für Mieter: Kontaktieren Sie Ihren Vermieter und bitten Sie ihn, den Prozess mit{' '}
        <a 
          href="https://zinsli.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-black underline hover:text-accent-red transition-colors"
        >
          Zinsli
        </a>{' '}
        zu initiieren, um unsere WBTC- und ZCHF-basierten Kautionsprodukte für Ihre Mietkaution zu nutzen. Für Vermieter: Wenden Sie sich direkt an Zinsli, um diese innovativen Kautionslösungen Ihren Mietern anzubieten. Benötigen Sie Hilfe bei der Verbindung mit Zinsli oder haben Fragen? Unser Schweizer Team hilft gerne. Kontaktieren Sie uns unter{' '}
        <a 
          href="mailto:info@plusplus.swiss" 
          className="text-black underline hover:text-accent-red transition-colors"
        >
          info@plusplus.swiss
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
        className="text-black underline hover:text-accent-red transition-colors"
      >
        Zinsli
      </a>{' '}
      to use our WBTC and ZCHF-based deposit products for your rental deposit. For landlords: Reach out to Zinsli directly to offer these innovative deposit solutions to your tenants. Need assistance connecting with Zinsli or have questions? Our Swiss-based team is here to help. Contact us at{' '}
      <a 
        href="mailto:info@plusplus.swiss" 
        className="text-black underline hover:text-accent-red transition-colors"
      >
        info@plusplus.swiss
      </a>{' '}
      or through our website contact form.
    </div>
  );
}

export default function HelpPage() {
  const t = useTranslations('help');
  const locale = useLocale();

  /* SEO: Build FAQ items from translations for dynamic schema generation */
  // The support answer is rendered as a dynamic component in the UI but
  // we also provide a plain-text version for the FAQ schema so search
  // engines can index it.
  const supportAnswerText = locale === 'de'
    ? 'Der Einstieg ist einfach! Für Mieter: Bitten Sie Ihren Vermieter, den Prozess mit Zinsli (https://zinsli.com) zu initiieren, um WBTC- oder ZCHF-basierte Kautionsprodukte zu nutzen. Für Vermieter: Kontaktieren Sie Zinsli direkt. Bei Fragen wenden Sie sich bitte an info@plusplus.swiss oder nutzen Sie das Kontaktformular auf unserer Website.'
    : 'Getting started is easy! For tenants: ask your landlord to initiate the process with Zinsli (https://zinsli.com) to use our WBTC or ZCHF-based deposit products. For landlords: contact Zinsli directly. If you need help, please contact info@plusplus.swiss or use the contact form on our website.';

  const faqItems = [
    { id: 'what-is-plusplus', question: t('questions.whatIs.question'), answer: t('questions.whatIs.answer') },
    { id: 'products', question: t('questions.products.question'), answer: t('questions.products.answer') },
    { id: 'how-it-works', question: t('questions.howItWorks.question'), answer: t('questions.howItWorks.answer') },
    { id: 'benefits', question: t('questions.benefits.question'), answer: t('questions.benefits.answer') },
    { id: 'security', question: t('questions.security.question'), answer: t('questions.security.answer') },
    { id: 'risks', question: t('questions.risks.question'), answer: t('questions.risks.answer') },
    { id: 'access', question: t('questions.access.question'), answer: t('questions.access.answer') },
    { id: 'regulation', question: t('questions.regulation.question'), answer: t('questions.regulation.answer') },
    { id: 'privacy', question: t('questions.privacy.question'), answer: t('questions.privacy.answer') },
    { id: 'support', question: t('questions.support.question'), answer: supportAnswerText }
  ];

  /* 
    FAQPage SCHEMA
    Type: schema.org/FAQPage
    
    Purpose: Tells search engines that this page is a FAQ page with Q&A content
    Benefits for SEO:
    1. Enables FAQ featured snippets in Google Search results
    2. Shows questions and answers directly in SERP (improves CTR)
    3. Helps Google match conversational queries to FAQ answers
    4. Can generate "People Also Ask" sections on SERPs
    5. Improves visibility for "how to" and "what is" queries
    
    Structure:
    - @type: FAQPage - signals this is a FAQ page
    - mainEntity: Array of Question objects
    - Each Question has:
      - name: the question text
      - acceptedAnswer: the answer text
    
  Note: We include all FAQ items including the support question. The UI still renders a dynamic component for the support answer, but the schema contains a plain-text version so search engines can index it.
    Format: JSON-LD (standard for structured data)
  */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
  
  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      {/* SEO: Inject FAQPage schema for featured snippets and SERP display */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
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
