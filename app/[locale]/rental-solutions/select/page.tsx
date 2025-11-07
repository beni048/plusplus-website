 'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, User } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';

/* Metadata for this route is provided by a server-side layout:
   app/[locale]/rental-solutions/select/layout.tsx
   This keeps the page a client component while satisfying Next.js/Turbopack rules. */

export default function RentalSolutionsSelect() {
  const t = useTranslations('rentalSolutionsSelect');
  const locale = useLocale();

  /* SEO: 2-level breadcrumb (Home > Rental Solutions) */
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
      }
    ]
  };

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
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-primary font-medium text-black px-4">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 block sm:hidden">
              {t('subtitle')}
            </p>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 hidden sm:block">
              {t('subtitleFull')}
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-stretch">
            
            {/* Tenant Card */}
            <Link href={`/${locale}/rental-solutions/tenant`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection_v2/toa-heftiba-XFdFdmVYe3Y-unsplash.jpg"
                    alt={locale === 'de' ? 'Paar entspannt sich in hellem Wohnzimmer mit lesender Frau und Mann, der aus dem Fenster schaut' : 'Couple relaxing in bright living room with woman reading book and man gazing out window from couch'}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-600/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-blue-600/90 backdrop-blur-sm p-3 rounded-lg">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Toa Heftiba
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                    {t('tenant.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('tenant.description')}
                  </p>
                  <div className="flex items-center text-blue-600 font-primary font-medium">
                    <span className="mr-2">{t('tenant.cta')}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Landlord Card */}
            <Link href={`/${locale}/rental-solutions/landlord`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection_v2/jakub-zerdzicki-bqUZEAeWuok-unsplash.jpg"
                    alt={locale === 'de' ? 'Hand hält Wohnungsschlüssel mit Schlüsselanhänger vor unscharfem Wohnungseingang' : 'Hand holding apartment key with keychain against blurred entrance door background'}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-600/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-green-600/90 backdrop-blur-sm p-3 rounded-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Jakub Kriz
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-green-600 transition-colors">
                    {t('landlord.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('landlord.description')}
                  </p>
                  <div className="flex items-center text-green-600 font-primary font-medium">
                    <span className="mr-2">{t('landlord.cta')}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        <div className="pb-24"></div>
      </div>

      {/* Contact Team Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
              {t('contact.question')}
            </p>
            <Button 
              className="bg-accent-red text-white px-8 py-4 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary"
              onClick={() => window.location.href = `/${locale}/contact`}
            >
              {t('contact.button')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
