 'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';

/* Metadata for this route is provided by a server-side layout:
   app/[locale]/rental-solutions/landlord/layout.tsx
   This keeps the page a client component while satisfying Next.js/Turbopack rules. */

export default function RentalSolutionsLandlord() {
  const t = useTranslations();
  const locale = useLocale();

  /* SEO: 3-level breadcrumb (Home > Rental Solutions > Landlord) */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': locale === 'de' ? 'Startseite' : 'Home',
        'item': `https://plusplus.swiss/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': locale === 'de' ? 'Mietlösungen' : 'Rental Solutions',
        'item': `https://plusplus.swiss/${locale}/rental-solutions/select`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': locale === 'de' ? 'Vermieter' : 'Landlord',
        'item': `https://plusplus.swiss/${locale}/rental-solutions/landlord`
      }
    ]
  };

  const zinsliLoginUrl = locale === 'de' ? 'https://app.zinsli.com/de/signup' : 'https://app.zinsli.com/en/signup';

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      {/* SEO: Inject breadcrumb schema for SERP display */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
                src="/images/collection_v2/chris-henry-CVzlQGDMOJY-unsplash.jpg"
                alt={locale === 'de' ? 'Ich-Perspektive einer Person in schwarzer Hose und Sneakern auf hölzerner Brücke mit Metallgeländern' : 'First-person perspective of person sitting on wooden bridge in black pants and sneakers with metal rails'}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Chris Henry
              </div>
            </div>
            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary w-full"
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
                {t('rentalSolutionsLandlord.stepByStep.intro')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.1.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.2.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.3.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.3.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{t('rentalSolutionsLandlord.stepByStep.steps.4.title')}</h3>
                    <p className="text-neutral-dark text-sm">{t('rentalSolutionsLandlord.stepByStep.steps.4.description')}</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary"
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
            <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
              <Image
                src="/images/collection_v2/charlesdeluvio-AT5vuPoi8vc-unsplash.jpg"
                alt={locale === 'de' ? 'Neonschild mit zwei weissen Händen, die sich schütteln in Plexiglasbox an Betonwand' : 'Neon sign of two white hands shaking in plexiglass box mounted on concrete wall'}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Charles Deluvio
              </div>
            </div>
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary w-full"
              >
                {t('rentalSolutionsLandlord.advantages.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="space-y-6 order-3 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsLandlord.advantages.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsLandlord.advantages.intro')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.bullets.1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.bullets.2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.bullets.3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.advantages.bullets.4')}</span>
                </li>
              </ul>
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary"
                >
                  {t('rentalSolutionsLandlord.advantages.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection_v2/nicolas-peyrol-iWacqnogqO4-unsplash.jpg"
                alt={locale === 'de' ? 'Schweizer Riesenrad mit zentralem Schweizer Kreuz in verschwommener Bewegungsaufnahme mit Bergen und Strasse' : 'Swiss ferris wheel with central Swiss cross in blurred motion shot with mountains and street foreground'}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Nicolas Peyrol
              </div>
            </div>
            <div className="order-2 lg:hidden">
              <Button
                onClick={() => window.open(zinsliLoginUrl, '_blank')}
                className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary w-full"
              >
                {t('rentalSolutionsLandlord.technology.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="space-y-6 order-3 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('rentalSolutionsLandlord.technology.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('rentalSolutionsLandlord.technology.intro')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.bullets.1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.bullets.2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.bullets.3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('rentalSolutionsLandlord.technology.bullets.4')}</span>
                </li>
              </ul>
              <div className="pt-6 hidden lg:block">
                <Button
                  onClick={() => window.open(zinsliLoginUrl, '_blank')}
                  className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary"
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
              {t('rentalSolutionsLandlord.finalCta.intro')}
            </p>
            <a
              href={zinsliLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-red text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-red/90 transition-all duration-300 rounded-lg inline-block font-medium"
            >
              {t('rentalSolutionsLandlord.finalCta.cta')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
