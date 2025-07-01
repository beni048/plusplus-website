"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import confetti from 'canvas-confetti';

export default function Home() {
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
        // Trigger confetti effect on success
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
        {/* Content container with responsive positioning and navbar margin on mobile */}
        <div className="relative z-10 flex h-full flex-col px-4 text-neutral-white
          sm:items-center sm:justify-center sm:text-center
          items-start justify-center pt-20 text-left">
          {/* Title - left-aligned on mobile, centered on desktop with constrained width */}
          <h1 className="mb-10 sm:mb-8 w-full sm:max-w-7xl text-left sm:text-center text-4xl sm:text-5xl font-extrabold tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
            YOUR TRUSTWORTHY AND SIMPLE ENTRY INTO DEFI
          </h1>
          {/* Paragraph - hidden on very small screens to save space, left-aligned on mobile, centered on desktop */}
          <p className="hidden min-[480px]:block text-left sm:text-center sm:mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            We bring the advantages of decentralization to traditional finance, from
            Switzerland to a global market.
          </p>
          {/* Button container - left aligned on mobile (<640px), centered on desktop (≥640px) */}
          <div className="w-full max-w-2xl flex justify-start sm:justify-center">
            <Link href="/help">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 group bg-primary-teal hover:bg-primary-teal/90 text-primary-navy"
              >
                Learn More
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
            Our Purpose & Vision
          </h2>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-lg leading-relaxed text-neutral-dark">
              Plusplus revolutionizes traditional savings by bridging the efficiency
              of decentralized finance (DeFi) with the stability of the Swiss Franc
              market. We offer institutional-grade solutions that deliver attractive
              yields (3-4% APY) on Swiss Franc deposits through secure, regulated
              DeFi protocols.
            </p>
            <p className="text-lg leading-relaxed text-neutral-dark">
              Our vision is to make high-yield savings accessible to everyone while
              maintaining the security and reliability of Swiss financial standards.
              Through innovative blockchain technology and smart contracts, we're
              creating a future where traditional and decentralized finance work
              seamlessly together.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">
            Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Jonas",
                role: "Co-Founder",
                bio: "Sales and Business Development Expert.", //"Former Relai advisor and key contributor to scaling Lionstep from 1 to 9 million in three years, with expertise in sales and B2B networking."
                image: "/images/team/florian-meier.png",
              },
              {
                name: "Benjamin",
                role: "Co-Founder & CEO interim",
                bio: "Technology and business expert with a background from ETH and ZHAW, specializing in development, IT consulting, cybersecurity, and cloud technologies.",
                image: "/images/team/benjamin-rossi.jpg",
              },
              {
                name: "Matthias",
                role: "CTO",
                bio: "PhD candidate at Unibas. Expert on rental deposits on the blockchain, DeFi and Ethereum.",
                image: "/images/team/florian-meier.png",
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden border-primary-teal/20">
                <div className="relative aspect-square w-48 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-primary-navy">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-lg font-medium text-primary-blue">
                    {member.role}
                  </p>
                  <p className="text-lg text-neutral-dark">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-medium text-primary-navy">
            Trusted Partners
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Zinsli.com",
                description:
                  "Swiss marketplace for digital rental‑deposit solutions.",
                logo: "/images/partners/zinsli.jpg",
                link: "https://zinsli.com",
              },
              {
                name: "Frankencoin.com",
                description:
                  "Decentralized Swiss Franc stablecoin ecosystem.",
                logo: "/images/partners/frankencoin.webp",
                link: "https://frankencoin.com",
              },
              {
                name: "DFX.swiss",
                description:
                  "Institutional DeFi FX solutions for CHF, EUR, and USD.",
                logo: "/images/partners/dfx.jpg",
                link: "https://dfx.swiss",
              },
              {
                name: "Aktionariat",
                description:
                  "Equity tokenization platform for Swiss SMEs.",
                logo: "/images/partners/aktionariat.svg",
                link: "https://aktionariat.com",
              },
              {
                name: "Bitcoin Suisse",
                description:
                  "Pioneering crypto brokerage and custody services.",
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
                    {partner.description}
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
            Get in Touch
          </h2>
          <div className="mx-auto max-w-lg">
            <Card className="p-8 border-primary-teal/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium text-primary-navy mb-4">
                    Thank you for your message!
                  </h3>
                  <p className="text-neutral-dark">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Name"
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
                      placeholder="Email"
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
                      placeholder="Message"
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
                    {isLoading ? "Sending..." : "Send Message"}
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