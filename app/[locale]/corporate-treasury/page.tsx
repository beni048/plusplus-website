'use client';

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function CorporateTreasury() {
  const t = useTranslations(); // Remove namespace to access all translations

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('corporateTreasury.hero.title')}
          </h1>
          
          {/* Development Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> This page is currently in development. All content shown is placeholder text and subject to change.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              {t('corporateTreasury.hero.subtitle')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.overview.title')}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.overview.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.services.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.services.liquidity.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('corporateTreasury.services.liquidity.description')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('corporateTreasury.services.liquidity.feature1')}</li>
              <li>{t('corporateTreasury.services.liquidity.feature2')}</li>
            </ul>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.services.yield.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('corporateTreasury.services.yield.description')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('corporateTreasury.services.yield.feature1')}</li>
              <li>{t('corporateTreasury.services.yield.feature2')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.benefits.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.efficiency.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.efficiency.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.security.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.security.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.transparency.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.transparency.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.clients.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.sme.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.sme.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.institutions.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.institutions.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.startups.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.startups.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 shadow-lg border-primary-teal/20">
              <h2 className="text-4xl font-primary font-medium text-black mb-6">
                {t('mainSections.contact.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
                {t('mainSections.contact.paragraph')}
              </p>
              <div className="space-y-4">
                <Button 
                  className="bg-accent-orange text-white px-8 py-4 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                  onClick={() => window.open('https://meetings-eu1.hubspot.com/jonas-waelti?uuid=907baac1-ae5e-422b-9703-6d822d374dbe', '_blank')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('mainSections.contact.button')}
                </Button>
                <p className="text-sm text-neutral-dark font-secondary">
                  {t('mainSections.contact.subtitle')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}