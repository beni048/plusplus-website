"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import confetti from 'canvas-confetti';
import { useTranslations, useLocale } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const analytics = useAnalytics();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Track form submission for analytics
    analytics.trackContactFormSubmit();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully, triggering confetti");
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
      <section className="relative h-[100svh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
          alt="Star filled sky with mountains"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-gray-400/80" />
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="font-black text-[clamp(2.5rem,8vw,5rem)] text-gray-900 mb-4 leading-tight">
            {t('hero.title.simple')} <span className="text-accent-orange">{t('hero.title.highlight')}</span>, {t('hero.title.subtitle')}
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
            {t('hero.subtitle')}
          </p>
          <Link href={`/${locale}/help`}>
            <Button 
              className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 group"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-medium text-black">
            {t('about.title')}
          </h2>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-lg leading-relaxed text-neutral-dark">
              {t('about.paragraph1')}
            </p>
            <p className="text-lg leading-relaxed text-neutral-dark">
              <span dangerouslySetInnerHTML={{ 
                __html: t('about.paragraph2').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
            </p>
            <p className="text-lg leading-relaxed text-neutral-dark">
              <span dangerouslySetInnerHTML={{ 
                __html: t('about.paragraph3').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - DEACTIVATED */}
      {false && (
        <section id="team" className="bg-neutral-light py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-4xl font-medium text-black">
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
                    <h3 className="mb-2 text-2xl font-bold text-black">
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

      {/* Divider line */}
      <div className="h-px bg-neutral-light"></div>

      {/* Partners Section */}
      <section id="partners" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-medium text-black">
            {t('partners.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              // DEACTIVATED: Aktionariat
              // {
              //   name: "Aktionariat",
              //   descriptionKey: "aktionariat",
              //   logo: "/images/partners/aktionariat.webp",
              //   link: "https://aktionariat.com",
              // },
              // DEACTIVATED: Bitcoin Suisse
              // {
              //   name: "Bitcoin Suisse",
              //   descriptionKey: "bitcoinsuisse",
              //   logo: "/images/partners/bitcoin-suisse.png",
              //   link: "https://bitcoinsuisse.com",
              // },
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
                  <h3 className="mb-4 text-center text-xl font-bold text-black">
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
          <h2 className="mb-16 text-center text-4xl font-medium text-black">
            {t('contact.title')}
          </h2>
          <div className="mx-auto max-w-lg">
            <Card className="p-8 border-primary-teal/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium text-black mb-4">
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
                      id="contact-name"
                      name="name"
                      autoComplete="name"
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
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
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
                      id="contact-message"
                      name="message"
                      autoComplete="off"
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
                    className="h-12 w-full text-lg bg-accent-orange hover:bg-accent-orange/90 text-white"
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