'use client';

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from 'next/image';

export default function CorporateTreasury() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="mb-12 text-center text-4xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('corporateTreasury.hero.title')}
            </h1>
            <p className="text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
              {t('corporateTreasury.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Frankencoin Product Section */}
      <section className="bg-neutral-light pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Left */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('corporateTreasury.frankencoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('corporateTreasury.frankencoin.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.stablecoin')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.overcollateralized')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.audited')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.transparent')}</span>
                </li>
              </ul>
            </div>
            
            {/* Image Right */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
              <Image
                src="/images/collection/scott-graham-5fNmWej4tAA-unsplash.webp"
                alt="Frankencoin treasury solution"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plusplus Trust Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection/melina-kiefer-iaAyocrpqTE-unsplash.webp"
                alt="Secure and regulated"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-2 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('corporateTreasury.trust.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('corporateTreasury.trust.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.regulated')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.aml')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.soc2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.segregation')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.liquidity')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.multisig')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>
                    {t('corporateTreasury.trust.benefits.audited')} 
                    <a 
                      href="https://chainsecurity.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-orange hover:underline ml-1"
                    >
                      ChainSecurity
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 shadow-lg border-primary-teal/20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black mb-6">
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