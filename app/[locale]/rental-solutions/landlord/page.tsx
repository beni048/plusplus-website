'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function RentalSolutionsLandlord() {
  const t = useTranslations();
  const locale = useLocale();

  const zinsliLoginUrl = locale === 'de' ? 'https://app.zinsli.com/de/login' : 'https://app.zinsli.com/en/login';

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('rentalSolutionsLandlord.title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 block sm:hidden">
              {t('rentalSolutionsLandlord.subtitle')}
            </p>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 hidden sm:block">
              {t('rentalSolutionsLandlord.subtitleFull')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Step-by-Step Guide Section */}
      <section className="bg-neutral-light pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection/melina-kiefer-iaAyocrpqTE-unsplash.webp"
                alt="Step by step setup"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Melina Kiefer
              </div>
            </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary w-full"
              >
                {t('rentalSolutionsLandlord.stepByStep.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-3 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsLandlord.stepByStep.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsLandlord.stepByStep.description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-accent-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.step1.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.step1.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.step2.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.step2.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.step3.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.step3.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.step4.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.step4.description')}</p>
                  </div>
                </div>
              </div>

              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                >
                  {t('rentalSolutionsLandlord.stepByStep.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image Right */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
              <Image
                src="/images/collection/scott-graham-5fNmWej4tAA-unsplash.webp"
                alt="Digital rental management"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Scott Graham
              </div>
            </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary w-full"
              >
                {t('rentalSolutionsLandlord.advantages.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Text Left */}
            <div className="space-y-6 order-3 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsLandlord.advantages.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsLandlord.advantages.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.benefits.setup')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.benefits.banks')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.benefits.notifications')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.benefits.release')}</span>
                </li>
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                >
                  {t('rentalSolutionsLandlord.advantages.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Plusplus Technology Section */}
      <section className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection/ilia-bronskiy-NsmhIKZFzGo-unsplash.webp"
                alt="Blockchain technology"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Ilia Bronskiy
              </div>
            </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary w-full"
              >
                {t('rentalSolutionsLandlord.technology.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Text Right */}
            <div className="space-y-6 order-3 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsLandlord.technology.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsLandlord.technology.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.benefits.efficiency')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.benefits.cost')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.benefits.transparency')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.benefits.security')}</span>
                </li>
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                >
                  {t('rentalSolutionsLandlord.technology.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black mb-6">
              {t('rentalSolutionsLandlord.finalCta.title')}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
              {t('rentalSolutionsLandlord.finalCta.description')}
            </p>
            <a
              href={zinsliLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
            >
              {t('rentalSolutionsLandlord.stepByStep.cta')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
