"use client";

import React from "react"; // Add this line
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import confetti from 'canvas-confetti';
import { useTranslations, useLocale } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale(); // Add this line
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[100svh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop"
            alt="Modern Building"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary-navy/60" />
        </div>
        <div className="relative z-10 flex h-full flex-col text-neutral-white
          sm:items-center sm:justify-center sm:text-center sm:px-4
          items-start justify-center pt-20 text-left px-1">
          
          {/* Mobile-optimized title container */}
          <div className="w-full max-w-full sm:max-w-7xl">
            <h1 
              className="mb-10 sm:mb-8 w-full max-w-full text-left sm:text-center font-black tracking-normal 
                text-[clamp(2.8rem,14vw,5.5rem)] 
                sm:text-[clamp(3rem,8vw,6rem)] 
                md:text-[clamp(4rem,10vw,7rem)] 
                lg:text-[clamp(5rem,12vw,8rem)]
                leading-[0.9] sm:leading-[0.9] md:leading-[0.95]
                break-words"
              lang={t('hero.title.lang')}
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: t('hero.title.lang') === 'de' ? 'auto' : 'none'
              }}
            >
              {/* Mobile version */}
              <span className="sm:hidden block">
                {t('hero.title.mobile')
                  .split(' ')
                  .map((word, index) => {
                    const isHighlightWord = ['EINFACHER', 'EINSTIEG', 'SIMPLE', 'ENTRY'].includes(word);
                    const isBreakWord = ['INTO', 'IN', 'UND'].includes(word);
                    const isLongGermanWord = word === 'VERTRAUENSWÜRDIGER';
                    
                    let displayWord = word;
                    if (isLongGermanWord) {
                      displayWord = 'VERTRAUENS&shy;WÜRDIGER';
                    }
                    
                    if (isHighlightWord) {
                      return (
                        <React.Fragment key={index}>
                          {index > 0 && <br />}
                          <span 
                            className="text-primary-teal inline-block"
                            dangerouslySetInnerHTML={{ __html: `${displayWord} ` }}
                          />
                        </React.Fragment>
                      );
                    }
                    
                    if (isBreakWord) {
                      return (
                        <React.Fragment key={index}>
                          <br />
                          <span 
                            className="inline-block"
                            dangerouslySetInnerHTML={{ __html: `${displayWord}&nbsp; ` }} 
                          />
                        </React.Fragment>
                      );
                    }
                    
                    return (
                      <span 
                        key={index}
                        className="inline-block"
                        dangerouslySetInnerHTML={{ __html: `${displayWord}&nbsp; ` }}
                      />
                    );
                  })}
              </span>

              {/* Desktop version */}
              <span className="hidden sm:inline">
                {t('hero.title.desktop')
                  .split(' ')
                  .map((word, index) => {
                    const isHighlightWord = ['EINFACHER', 'EINSTIEG', 'SIMPLE', 'ENTRY'].includes(word);
                    const isLongGermanWord = word === 'VERTRAUENSWÜRDIGER';
                    
                    let displayWord = word;
                    if (isLongGermanWord) {
                      displayWord = 'VERTRAUENS&shy;WÜRDIGER';
                    }
                    
                    if (isHighlightWord) {
                      return (
                        <span 
                          key={index}
                          className="text-primary-teal"
                          dangerouslySetInnerHTML={{ __html: `${displayWord} ` }}
                        />
                      );
                    }
                    
                    return (
                      <span 
                        key={index}
                        dangerouslySetInnerHTML={{ __html: `${displayWord} ` }}
                      />
                    );
                  })}
              </span>
            </h1>
          </div>
          
          <p className="hidden min-[480px]:block text-left sm:text-center sm:mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 px-2 sm:px-0">
            {t('hero.subtitle')}
          </p>
          <div className="w-full max-w-2xl flex justify-start sm:justify-center px-2 sm:px-0">
            <Link href={`/${locale}/help`}>
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 group bg-primary-teal hover:bg-primary-teal/90 text-primary-navy"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-medium text-primary-navy">
            {t('about.title')}
          </h2>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-lg leading-relaxed text-neutral-dark">
              {t('about.paragraph1')}
            </p>
            <p className="text-lg leading-relaxed text-neutral-dark">
              {t('about.paragraph2')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - DEACTIVATED */}
      {false && (
        <section id="team" className="bg-neutral-light py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">
              {t('team.title')}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  key: 'benjamin',
                  image: "/images/team/benjamin_.png",
                },
                {
                  key: 'matthias',
                  image: "/images/team/matthias.png",
                },
                {
                  key: 'jonas',
                  image: "/images/team/jonas.png",
                },
              ].map((member) => (
                <Card key={member.key} className="overflow-hidden border-primary-teal/20">
                  <div className="relative aspect-square w-48 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="Team Member"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-2 text-2xl font-bold text-primary-navy">
                      {t(`team.members.${member.key}.name`)}
                    </h3>
                    <p className="mb-4 text-lg font-medium text-primary-blue">
                      {t(`team.members.${member.key}.role`)}
                    </p>
                    <p className="text-lg text-neutral-dark">
                      {t(`team.members.${member.key}.bio`)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section id="partners" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">
            {t('partners.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Zinsli.com",
                descriptionKey: "zinsli",
                logo: "/images/partners/zinsli.jpg",
                link: "https://zinsli.com",
              },
              {
                name: "Frankencoin.com",
                descriptionKey: "frankencoin",
                logo: "/images/partners/frankencoin.webp",
                link: "https://frankencoin.com",
              },
              {
                name: "DFX.swiss",
                descriptionKey: "dfx",
                logo: "/images/partners/dfx.jpg",
                link: "https://dfx.swiss",
              },
              {
                name: "Aktionariat",
                descriptionKey: "aktionariat",
                logo: "/images/partners/aktionariat.svg",
                link: "https://aktionariat.com",
              },
              {
                name: "Bitcoin Suisse",
                descriptionKey: "bitcoinsuisse",
                logo: "/images/partners/bitcoin-suisse.jpg",
                link: "https://bitcoinsuisse.com",
              },
            ].map((partner) => (
              <a
                key={partner.name}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Card className="h-full p-8 border-primary-teal/20">
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </div>
                  <h3 className="mb-4 text-center text-xl font-bold text-primary-navy">
                    {partner.name}
                  </h3>
                  <p className="text-lg text-center text-neutral-dark">
                    {t(`partners.descriptions.${partner.descriptionKey}`)}
                  </p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">
            {t('contact.title')}
          </h2>
          <div className="mx-auto max-w-lg">
            <Card className="p-8 border-primary-teal/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium text-primary-navy mb-4">
                    {t('contact.success.title')}
                  </h3>
                  <p className="text-neutral-dark">
                    {t('contact.success.message')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder={t('contact.form.name')}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t('contact.form.email')}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t('contact.form.message')}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 w-full text-lg bg-accent-orange hover:bg-accent-orange/90"
                    disabled={isLoading}
                  >
                    {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}