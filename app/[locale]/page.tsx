"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const analytics = useAnalytics();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[100svh] flex items-center justify-center">
        <Image
          src="/images/title_img.webp"
          alt="Title background image"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Discrete photo credit */}
        <div className="absolute bottom-2 right-2 text-[10px] text-white/40 font-secondary">
          Collin Croome
        </div>
        <div className="absolute inset-0 flex items-start justify-end" style={{ paddingTop: 'max(calc(33.33vh - 6rem), 6rem)' }}>
          {/* Desktop: Box with background, Mobile: No box */}
          <div className="hidden sm:block bg-black/30 backdrop-blur-md border-l border-white/30 shadow-2xl h-auto animate-slide-in-right ml-0 sm:ml-[10vw] md:ml-[15vw] lg:ml-[25vw] xl:ml-[35vw] 2xl:ml-[45vw]" style={{ borderRadius: '0px 0px 0px 0px', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', width: '100%', maxWidth: '100%', minHeight: 'auto' }}>
            <div className="flex items-center justify-start">
              <div className="p-6 md:p-8 lg:p-10 max-w-2xl w-full ml-0 sm:ml-[2vw] md:ml-[3vw] lg:ml-[4vw] xl:ml-[5vw]">
                <h1 className="font-primary font-black text-[clamp(2.5rem,6vw,4rem)] text-white mt-6 mb-4 leading-tight text-left drop-shadow-lg">
                  {t('hero.title.simple')} <span className="text-accent-orange drop-shadow-lg">{t('hero.title.highlight')}</span> {t('hero.title.subtitle')}
                </h1>
                <p className="font-secondary text-lg md:text-xl text-gray-50 mb-6 leading-relaxed text-left font-medium drop-shadow-md">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-8">
                  <Link href={`/${locale}/select`}>
                    <Button 
                      className="bg-accent-orange text-white px-6 py-3 md:px-8 md:py-4 text-lg shadow-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary"
                    >
                      {t('hero.cta')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Light box for title, button below */}
          <div className="block sm:hidden w-full px-4">
            <div className="text-center">
              {/* Light background box for title only */}
              <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 mb-6 shadow-lg">
                <h1 className="font-primary font-black text-[clamp(2.5rem,8vw,3.5rem)] text-white leading-tight drop-shadow-lg">
                  {t('hero.title.simple')} <span className="text-accent-orange drop-shadow-lg">{t('hero.title.highlight')}</span> {t('hero.title.subtitle')}
                </h1>
              </div>
              
              {/* Button below the box */}
              <div>
                <Link href={`/${locale}/select`}>
                  <Button 
                    className="bg-accent-orange text-white px-8 py-4 text-lg shadow-2xl hover:bg-accent-orange/90 group transition-all duration-300 border-2 border-black/20 font-primary"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Solutions Section */}
      <section id="rental-solutions" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Left */}
            <div className="space-y-6">
              <h2 className="text-4xl font-primary font-medium text-black">
                {t('mainSections.rentalSolutions.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.rentalSolutions.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.rentalSolutions.paragraph2')}
              </p>
              <div className="pt-4">
                <Link href={`/${locale}/rental-solutions/select`}>
                  <Button className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary">
                    {t('mainSections.rentalSolutions.button')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Image Right */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/collection/eric-weber-_wB88hxsW8M-unsplash.webp"
                alt="Rental Solutions"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Eric Weber
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Treasury Section */}
      <section id="corporate-treasury" className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full order-2 lg:order-1">
              <Image
                src="/images/collection/florian-schmid-M8ek54EzfzA-unsplash.webp"
                alt="Corporate Treasury"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Discrete photo credit */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/40 font-secondary">
                Florian Schmid
              </div>
            </div>
            
            {/* Text Right */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-primary font-medium text-black">
                {t('mainSections.corporateTreasury.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.corporateTreasury.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.corporateTreasury.paragraph2')}
              </p>
              <div className="pt-4">
                <Link href={`/${locale}/corporate-treasury`}>
                  <Button className="bg-accent-orange text-white px-6 py-3 text-lg hover:bg-accent-orange/90 group transition-all duration-300 font-primary">
                    {t('mainSections.corporateTreasury.button')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div className="h-px bg-neutral-light"></div>

      {/* Partners Section */}
      <section id="partners" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Left */}
            <div className="space-y-6">
              <h2 className="text-4xl font-primary font-medium text-black">
                {t('mainSections.partners.title')}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.partners.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed text-neutral-dark font-secondary">
                {t('mainSections.partners.paragraph2')}
              </p>
            </div>
            
            {/* Partners Collection Right */}
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "Zinsli.com",
                  descriptionKey: "zinsli",
                  logo: "/images/partners/zinsli.svg",
                  link: "https://zinsli.com",
                },
                {
                  name: "Frankencoin.com",
                  descriptionKey: "frankencoin",
                  logo: "/images/partners/frankencoin.png",
                  link: "https://frankencoin.com",
                },
                {
                  name: "DFX.swiss",
                  descriptionKey: "dfx",
                  logo: "/images/partners/dfx.svg",
                  link: "https://dfx.swiss",
                },
              ].map((partner) => (
                <a
                  key={partner.name}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <Card className="h-full p-6 border-primary-teal/20">
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </div>
                    <h3 className="mb-3 text-center text-lg font-primary font-bold text-black">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-center text-neutral-dark font-secondary">
                      {t(`partners.descriptions.${partner.descriptionKey}`)}
                    </p>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-neutral-light py-24">
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