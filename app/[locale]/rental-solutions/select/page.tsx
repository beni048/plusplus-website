'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, User } from 'lucide-react';

export default function RentalSolutionsSelect() {
  const t = useTranslations('rentalSolutionsSelect');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-white to-neutral-light pt-32 pb-24">
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
                    src="/images/title_img.webp"
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
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                    {t('tenant.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('tenant.description')}
                  </p>
                  <div className="flex items-center text-blue-600 font-primary font-medium">
                    <span className="mr-2">Get Started</span>
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
                    src="/images/title_img.webp"
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
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl lg:text-3xl font-primary font-bold text-black mb-4 group-hover:text-green-600 transition-colors">
                    {t('landlord.title')}
                  </h2>
                  <p className="text-lg font-secondary text-neutral-dark leading-relaxed mb-6">
                    {t('landlord.description')}
                  </p>
                  <div className="flex items-center text-green-600 font-primary font-medium">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-lg font-secondary text-neutral-dark mb-6">
                Not sure which option is right for you?
              </p>
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center bg-accent-orange text-white px-8 py-4 text-lg font-primary font-medium rounded-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 group"
              >
                Contact Our Team
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
