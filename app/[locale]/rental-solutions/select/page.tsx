'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, User } from 'lucide-react';

export default function RentalSolutionsSelect() {
  const t = useTranslations('rentalSolutionsSelect');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-primary font-bold text-black mb-6">
              {t('title')}
            </h1>
            <p className="text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-stretch">
            
            {/* Tenant Card */}
            <Link href={`/${locale}/rental-solutions/tenant`} className="group">
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/images/collection/maria-ziegler-jJnZg7vBfMs-unsplash.webp"
                    alt="Tenant Solutions"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-600/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-blue-600/90 backdrop-blur-sm p-3 rounded-lg">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Maria Ziegler
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
                    src="/images/collection/tierra-mallorca-rgJ1J8SDEAY-unsplash.webp"
                    alt="Landlord Solutions"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-600/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-green-600/90 backdrop-blur-sm p-3 rounded-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Discrete photo credit */}
                  <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                    Tierra Mallorca
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
            <Card className="p-12 shadow-lg border-primary-teal/20">
              <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
                {t('contact.question')}
              </p>
              <div className="space-y-4">
                <Button 
                  className="bg-accent-orange text-white px-8 py-4 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                  onClick={() => window.location.href = `/${locale}/contact`}
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  {t('contact.button')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
