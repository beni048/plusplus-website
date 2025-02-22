"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Bridging TradFi and DeFi
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl mb-10">
            We bring the advantages of decentralization to traditional finance, from Switzerland to a global market.
          </p>
          <Link href="/help">
            <Button variant="secondary" size="lg" className="text-lg px-8 group">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Our Purpose & Vision
          </h2>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-xl leading-relaxed text-gray-600">
              PA Finance revolutionizes traditional savings by bridging the efficiency of decentralized finance (DeFi) with the stability of the Swiss Franc market. We offer institutional-grade solutions that deliver attractive yields (3-4% APY) on Swiss Franc deposits through secure, regulated DeFi protocols.
            </p>
            <p className="text-xl leading-relaxed text-gray-600">
              Our vision is to make high-yield savings accessible to everyone while maintaining the security and reliability of Swiss financial standards. Through innovative blockchain technology and smart contracts, we're creating a future where traditional and decentralized finance work seamlessly together.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Jonas",
                role: "CEO",
                bio: "Sales and Crypto Expert.", //"Former Relai advisor and key contributor to scaling Lionstep from 1 to 9 million in three years, with expertise in sales and B2B networking."
                image: "/images/team/florian-meier.png",
              },
              {
                name: "Benjamin",
                role: "CTO",
                bio: "Technology and business expert with a background from ETH and ZHAW, specializing in development, IT consulting, cybersecurity, and cloud technologies.",
                image: "/images/team/benjamin-rossi.jpg",
              },
              {
                name: "Florian",
                role: "Board & Compliance",
                bio: "Compliance and Regulations Expert",//"Compliance Lead at Crypto Finance AG. Ensures PA Finance meets regulatory standards.",
                image: "/images/team/florian-meier.png",
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="relative aspect-square w-48 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-2 text-2xl font-semibold">{member.name}</h3>
                  <p className="mb-4 text-lg font-medium text-gray-500">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold">
            Trusted Partners
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Zinsli.com",
                description:
                  "Swiss-regulated crypto exchange, enabling seamless CHF/DeFi transactions.",
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
                <Card className="h-full p-8">
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </div>
                  <h3 className="mb-4 text-center text-xl font-semibold">
                    {partner.name}
                  </h3>
                  <p className="text-center text-gray-600">
                    {partner.description}
                  </p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold">Get in Touch</h2>
          <div className="mx-auto max-w-lg">
            <Card className="p-8">
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
                <Button type="submit" className="h-12 w-full text-lg">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-lg">© PA Finance 2024 | Zug, Switzerland</p>
            <a
              href="https://linkedin.com/company/pafinance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white transition-colors hover:text-gray-300"
            >
              <Mail className="h-6 w-6" />
              <span className="text-lg">Follow us on LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
