import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-primary-navy">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              This Privacy Policy explains the nature, scope, and purpose of processing personal data on www.plusplus.swiss (the "Website"). For definitions such as "personal data" and "processing," please refer to Article 4 of the GDPR and Article 3 of the Swiss Federal Data Protection Act (nFADP).
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">1. Data Controller</h2>
            <p className="text-lg leading-relaxed mb-6">
              Plusplus AG<br />
              Poststrasse 22<br />
              6300 Zug, Switzerland<br />
              Email: hello@plusplus.swiss
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">2. Collection and Processing of Personal Data</h2>
            
            <h3 className="text-xl font-medium text-primary-navy mb-3 mt-6">2.1. Access Data / Server Log Files</h3>
            <p className="text-lg leading-relaxed mb-6">
              When you visit the Website, certain data is automatically transmitted by your browser to our hosting provider, Vercel. This includes your IP address, date and time of access, and the URL requested. These data are technically necessary to operate the Website (Art. 45c TCA, Art. 6(1)(c) GDPR).
            </p>

            <h3 className="text-xl font-medium text-primary-navy mb-3 mt-6">2.2. Contact Form</h3>
            <p className="text-lg leading-relaxed mb-6">
              If you use our contact form, we collect your name, email address, and the message content you submit. Processing is based on our legitimate interest in responding to inquiries (Art. 6(1)(f) GDPR) and, if required, on your explicit consent (Art. 6(1)(a) GDPR).
            </p>

            <h3 className="text-xl font-medium text-primary-navy mb-3 mt-6">2.3. Cookies and Tracking</h3>
            <p className="text-lg leading-relaxed mb-4">
              The Website uses the following cookies and trackers:
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>Necessary cookies for basic site functionality (no consent required).</li>
              <li>Preference, Statistics, and Marketing cookies only after you have given explicit consent via the cookie banner.</li>
            </ul>
            <p className="text-lg leading-relaxed mb-6">
              Upon consent, we store a cookie named cookieConsent to record your choice. You may withdraw or modify your consent at any time via the cookie banner.
            </p>

            <h3 className="text-xl font-medium text-primary-navy mb-3 mt-6">2.4. Web Analytics</h3>
            <p className="text-lg leading-relaxed mb-6">
              We use Simple Analytics (EU-hosted, no cookies) or—only after consent—Google Analytics 4 with Consent Mode v2. Data are collected in anonymized form and not linked to any other Google services.
            </p>

            <h3 className="text-xl font-medium text-primary-navy mb-3 mt-6">2.5. Third-Party Services</h3>
            <p className="text-lg leading-relaxed mb-2">
              – reCAPTCHA by Google (operating under the EU-US Data Privacy Framework)<br />
              – Vercel Analytics (GDPR-compliant)
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Data are processed only on a lawful basis or after consent and are not transferred to countries without adequate data protection safeguards.
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">3. Legal Bases</h2>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>Art. 6(1)(c) GDPR / TCA § 45c: Storage of access data to ensure technical operation</li>
              <li>Art. 6(1)(f) GDPR: Legitimate interest in customer communication</li>
              <li>Art. 6(1)(a) GDPR: Consent for non-essential cookies and tracking</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">4. International Data Transfers</h2>
            <p className="text-lg leading-relaxed mb-6">
              Personal data are transferred only to countries with an adequate level of protection (Switzerland, EU, UK, Canada, U.S. companies under the EU-US Data Privacy Framework). For transfers to other countries, we use Standard Contractual Clauses.
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">5. Data Retention</h2>
            <p className="text-lg leading-relaxed mb-6">
              We retain personal data only as long as necessary for the purposes stated or as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">6. Your Rights</h2>
            <p className="text-lg leading-relaxed mb-6">
              Under Articles 15–20 GDPR, you have the right to access, rectify, erase, restrict processing, and data portability. To exercise these rights, contact us at hello@plusplus.swiss.
            </p>

            <h2 className="text-2xl font-semibold text-primary-navy mb-4 mt-8">7. Updates to This Policy</h2>
            <p className="text-lg leading-relaxed mb-6">
              We may update this Privacy Policy periodically. The date of the latest revision appears at the top.
            </p>

            <p className="text-lg leading-relaxed font-medium text-primary-navy mt-8">
              Last Updated: July 1, 2025.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
