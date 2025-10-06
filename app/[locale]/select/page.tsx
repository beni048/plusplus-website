'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Home } from 'lucide-react';

export default function ProductSelect() {
  const t = useTranslations('productSelect');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="mb-12 text-center text-4xl sm:text-5xl lg:text-6xl font-primary font-medium text-black px-4">
              {t('title')}
            </h1>
            <p className="text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
              {t('subtitle')}
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-stretch">
            
            {/* Rental Solutions Card */}
            <Link href={`/${locale}/rental-solutions/select`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection/alain-rouiller-kMSJ5S4gJjw-unsplash.webp"
                    alt="Rental Solutions"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-accent-orange/90 backdrop-blur-sm p-3 rounded-lg">
                      <Home className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Alain Rouiller
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-accent-orange transition-colors">
                    {t('rentalSolutions.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('rentalSolutions.description')}
                  </p>
                  <div className="flex items-center text-accent-orange font-primary font-medium">
                    <span className="mr-2">{t('rentalSolutions.cta')}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Corporate Treasury Card */}
            <Link href={`/${locale}/corporate-treasury`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection/scott-graham-5fNmWej4tAA-unsplash.webp"
                    alt="Corporate Treasury"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-primary-teal/90 backdrop-blur-sm p-3 rounded-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Scott Graham
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-primary-teal transition-colors">
                    {t('corporateTreasury.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('corporateTreasury.description')}
                  </p>
                  <div className="flex items-center text-primary-teal font-primary font-medium">
                    <span className="mr-2">{t('corporateTreasury.cta')}</span>
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
            <Card className="p-12 shadow-lg border-primary-teal/20">
              <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
                {t('contact.question')}
              </p>
              <div className="space-y-4">
                <Button 
                  className="w-full sm:w-auto bg-accent-orange text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                  onClick={() => window.location.href = `/${locale}/contact`}
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{t('contact.button')}</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
