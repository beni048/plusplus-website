"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';

export default function ContactPage() {
  const t = useTranslations('contact');
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            {t('title')}
          </h1>
          
          <Card className="p-8 border-primary-teal/20">
            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-black mb-4">
                  {t('success.title')}
                </h3>
                <p className="text-neutral-dark">
                  {t('success.message')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder={t('form.name')}
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
                    placeholder={t('form.email')}
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
                    placeholder={t('form.message')}
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
                  {isLoading ? t('form.sending') : t('form.submit')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}