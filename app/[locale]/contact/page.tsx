"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';

export default function ContactPage() {
  const t = useTranslations(); // Remove namespace to access all translations
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-primary font-medium text-black px-4">
            {t('contact.title')}
          </h1>
          
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
                    type="text"
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
        <div className="pb-24"></div>
      </div>

      {/* Sales Meeting Section */}
      <section className="bg-neutral-light py-24">
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