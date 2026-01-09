import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import ScheduleMeetingButton from "@/app/components/ScheduleMeetingButton";
import { Metadata } from "next";
import Script from "next/script";
import "../partners-carousel.css";
import { NewsList } from "@/components/NewsList";
import { NewsLoader } from "@/components/NewsLoader";
import { Suspense } from "react";

/* Metadata for the root locale route is provided by the server layout:
   app/[locale]/layout.tsx
   This keeps the page component as a client component while ensuring
   generateMetadata is exported from a server component (required by Next.js/Turbopack). */

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations();
  // News fetched via Streaming Component now

  /* SEO: BreadcrumbList schema enables breadcrumb navigation in Google Search results */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': locale === 'de' ? 'Startseite' : 'Home',
        'item': `https://plusplus.swiss/${locale}`
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* SEO: Inject breadcrumb schema for Google Search breadcrumb display */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[100svh] flex items-center justify-center">
        <Image
          src="/images/collection_v2/elias-bohl-PmGbIGCBzMU-unsplash.jpg"
          alt={locale === 'de' ? 'Bergbrücke in schneebedeckter Alpenlandschaft mit Haus, Kombination aus Natur und Architektur mit malerischen Felsen und Vegetation bei Tageslicht.' : 'Mountain bridge in snowy alpine landscape with house, combining nature and architecture with scenic rocks and vegetation in daylight.'}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Subtle gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/60"></div>
        {/* Discrete photo credit */}
        <div className="absolute bottom-2 right-2 text-[10px] text-white/60 font-secondary z-10">
          Elias Bohl
        </div>

        {/* Title box container, positioned independently */}
        <div className="absolute left-0 right-0 flex items-start justify-center" style={{ top: '30vh' }}>
          {/* Mobile: Centered simple layout */}
          <div className="block sm:hidden w-full px-6 text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-sm">
              <h1 className="font-primary font-black text-3xl text-white leading-tight mb-4">
                {t('hero.title.simple')} <span className="text-accent-red">{t('hero.title.highlight')}</span> {t('hero.title.subtitle')}
              </h1>
              <p className="font-secondary text-base text-white/90 mb-6 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <Link href={`/${locale}/corporate-treasury`}>
                <Button className="bg-accent-red text-white px-6 py-3 text-base hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop: Keep existing layout */}
          <div className="hidden sm:block bg-black/30 backdrop-blur-md border-l border-white/30 shadow-2xl h-auto animate-slide-in-right ml-0 sm:ml-[10vw] md:ml-[15vw] lg:ml-[25vw] xl:ml-[35vw] 2xl:ml-[45vw]" style={{ borderRadius: '0px 0px 0px 0px', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', width: '100%', maxWidth: '100%', minHeight: 'auto' }}>
            <div className="flex items-center justify-start">
              <div className="p-6 md:p-8 lg:p-10 max-w-2xl w-full ml-0 sm:ml-[2vw] md:ml-[3vw] lg:ml-[4vw] xl:ml-[5vw]">
                <h1 className="font-primary font-black text-[clamp(2.5rem,6vw,4rem)] text-white mt-6 mb-4 leading-tight text-left drop-shadow-lg">
                  {t('hero.title.simple')} <span className="text-accent-red drop-shadow-lg">{t('hero.title.highlight')}</span> {t('hero.title.subtitle')}
                </h1>
                <p className="font-secondary text-lg md:text-xl text-gray-50 mb-6 leading-relaxed text-left font-medium drop-shadow-md">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-8">
                  <Link href={`/${locale}/corporate-treasury`}>
                    <Button className="bg-accent-red text-white px-6 py-3 md:px-8 md:py-4 text-lg shadow-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                      {t('hero.cta')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Solutions Section
      <section id="rental-solutions" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
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
                  <Button className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                    {t('mainSections.rentalSolutions.button')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/collection_v2/eric-weber-_wB88hxsW8M-unsplash.jpg"
                alt={locale === 'de' ? 'Zürich Bahnhofstrasse in der Abenddämmerung mit beleuchteten Schaufenstern, Bäumen, die das goldene Strassenlicht reflektieren, unter dramatischen violetten Abendwolken, die eine atmosphärische Stadtszene schaffen.' : 'Zurich Bahnhofstrasse at twilight with illuminated storefronts, trees reflecting golden streetlights under dramatic purple evening clouds creating atmospheric urban scene.'}
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-white/40 font-secondary">
                Eric Weber
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Corporate Treasury Section */}
      {/* Corporate Treasury / News Section */}
      <section id="latest-news" className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="text-left mb-12">
              <h2 className="text-4xl font-primary font-medium text-black">
                {t('news.latest_news_title')}
              </h2>
            </div>

            {/* Dynamic News Feed (Limit 3) */}
            <div className="space-y-12 mb-0">
              <Suspense fallback={<NewsLoader text="Loading latest news..." />}>
                <NewsList locale={locale} limit={3} />
              </Suspense>
            </div>

            <div className="text-left pt-0 mt-0">
              <Link href={`/${locale}/news`}>
                <Button className="bg-accent-red text-white px-6 py-3 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary">
                  {t('news.more_news_button')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
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
            {/* Mobile: Horizontal scroll, Desktop: Grid with hover descriptions */}
            <div className="md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-4 hidden md:block">
              {[
                {
                  name: "Zinsli",
                  descriptionKey: "zinsli",
                  logo: "/images/partners/zinsli.svg",
                  link: "https://zinsli.com",
                },
                {
                  name: "Frankencoin",
                  descriptionKey: "frankencoin",
                  logo: "/images/partners/frankencoin.png",
                  link: "https://frankencoin.com",
                },
                {
                  name: "MtPelerin",
                  descriptionKey: "mtpelerin",
                  logo: "/images/partners/mtpelerin.png",
                  link: "https://www.mtpelerin.com",
                },
                {
                  name: "VNX",
                  descriptionKey: "vnx",
                  logo: "/images/partners/vnx.png",
                  link: "https://www.vnx.li",
                },
                {
                  name: "VQF",
                  descriptionKey: "vqf",
                  logo: "/images/partners/vqf.png",
                  link: "https://www.vqf.ch",
                },
                {
                  name: "ChainSecurity",
                  descriptionKey: "chainsecurity",
                  logo: "/images/partners/chain.jpg",
                  link: "https://www.chainsecurity.com",
                },
                {
                  name: "GWP",
                  descriptionKey: "gwp",
                  logo: "/images/partners/gwp.jpg",
                  link: "https://www.gwp.ch",
                },
              ].map((partner) => (
                <a
                  key={partner.name}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-32 p-4 border-primary-teal/20 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-primary-teal/50 relative overflow-hidden">
                    {/* Logo - visible by default */}
                    <div className="flex flex-col items-center justify-center h-full w-full group-hover:opacity-0 transition-opacity duration-300">
                      <div className="mb-2 flex justify-center items-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={40}
                          className="h-10 w-auto object-contain transition-all duration-300"
                          style={{ width: 'auto', maxHeight: '40px' }}
                        />
                      </div>
                      <h3 className="text-center text-sm font-primary font-bold text-black line-clamp-2">
                        {partner.name}
                      </h3>
                    </div>

                    {/* Description - appears on hover */}
                    <div className="absolute inset-0 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary-teal/5 to-primary-teal/10">
                      <p className="text-xs text-center text-neutral-dark font-secondary line-clamp-3">
                        {t(`mainSections.partners.descriptions.${partner.descriptionKey}`)}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Mobile: Auto-scrolling carousel */}
            <div className="md:hidden overflow-hidden">
              <div className="partners-carousel">
                <div className="carousel-track">
                  {[
                    { name: "Zinsli", logo: "/images/partners/zinsli.svg" },
                    { name: "Frankencoin", logo: "/images/partners/frankencoin.png" },
                    { name: "MtPelerin", logo: "/images/partners/mtpelerin.png" },
                    { name: "VNX", logo: "/images/partners/vnx.png" },
                    { name: "VQF", logo: "/images/partners/vqf.png" },
                    { name: "ChainSecurity", logo: "/images/partners/chain.jpg" },
                    { name: "GWP", logo: "/images/partners/gwp.jpg" },
                    // Duplicate for seamless loop
                    { name: "Zinsli", logo: "/images/partners/zinsli.svg" },
                    { name: "Frankencoin", logo: "/images/partners/frankencoin.png" },
                    { name: "MtPelerin", logo: "/images/partners/mtpelerin.png" },
                    { name: "VNX", logo: "/images/partners/vnx.png" },
                    { name: "VQF", logo: "/images/partners/vqf.png" },
                    { name: "ChainSecurity", logo: "/images/partners/chain.jpg" },
                    { name: "GWP", logo: "/images/partners/gwp.jpg" },
                  ].map((partner, index) => (
                    <div key={index} className="carousel-item">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={80}
                        height={40}
                        className="h-12 w-auto object-contain"
                        style={{ width: 'auto', maxHeight: '48px' }}
                        priority={index < 7}
                        loading={index < 7 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>
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