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

          {/* Product Cards */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-stretch">
            
            {/* Rental Solutions Card */}
            <Link href={`/${locale}/rental-solutions/select`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection_v2/alain-rouiller-kMSJ5S4gJjw-unsplash.jpg"
                    alt="Rental Solutions"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                    src="/images/collection_v2/scott-graham-5fNmWej4tAA-unsplash.jpg"
                    alt="Corporate Treasury"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
              {t('contact.question')}
            </p>
            <Button 
              className="bg-accent-orange text-white px-8 py-4 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
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
