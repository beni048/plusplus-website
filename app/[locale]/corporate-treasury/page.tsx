'use client';

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Image from 'next/image';
import ScheduleMeetingButton from '@/app/components/ScheduleMeetingButton';

export default function CorporateTreasury() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('corporateTreasury.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 block sm:hidden">
              {t('corporateTreasury.hero.subtitle')}
            </p>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 hidden sm:block">
              {t('corporateTreasury.hero.subtitleFull')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Frankencoin Product Section */}
      <section className="bg-neutral-light pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image Right */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-2">
              <Image
                src="/images/collection_v2/rico-reutimann-d58AtGgPm64-unsplash.jpg"
                alt="Frankencoin treasury solution"
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Rico Reutimann
              </div>
            </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <ScheduleMeetingButton className="w-full">
                {t('corporateTreasury.frankencoin.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ScheduleMeetingButton>
            </div>

            {/* Text Left */}
            <div className="space-y-6 order-3 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('corporateTreasury.frankencoin.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('corporateTreasury.frankencoin.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.stablecoin')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.overcollateralized')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.audited')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.frankencoin.benefits.transparent')}</span>
                </li>
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <ScheduleMeetingButton>
                  {t('corporateTreasury.frankencoin.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </ScheduleMeetingButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plusplus Trust Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-1 lg:order-1">
              <Image
                src="/images/collection_v2/urs-ruchti-2D6A0587.jpg"
                alt="Corporate Treasury - Urs Ruchti"
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Urs Ruchti
              </div>
            </div>

            {/* Button Mobile */}
            <div className="order-2 lg:hidden">
              <ScheduleMeetingButton className="w-full">
                {t('corporateTreasury.trust.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ScheduleMeetingButton>
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-3 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black">
                {t('corporateTreasury.trust.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('corporateTreasury.trust.description')}
              </p>
              <ul className="text-base text-neutral-dark space-y-3 font-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.regulated')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.aml')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.soc2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.segregation')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.liquidity')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>{t('corporateTreasury.trust.benefits.multisig')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-3 mt-1">•</span>
                  <span>
                    {t('corporateTreasury.trust.benefits.audited')} 
                    <a 
                      href="https://www.chainsecurity.com/security-audit/plusplus-custody" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-red hover:underline ml-1"
                    >
                      ChainSecurity
                    </a>
                  </span>
                </li>
              </ul>
              {/* Button Desktop */}
              <div className="pt-6 hidden lg:block">
                <ScheduleMeetingButton>
                  {t('corporateTreasury.trust.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </ScheduleMeetingButton>
              </div>
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
                <ScheduleMeetingButton>
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('mainSections.contact.button')}
                </ScheduleMeetingButton>
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