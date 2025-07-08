"use client";

import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslations, useLocale } from 'next-intl';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isEnabled = process.env.NEXT_PUBLIC_COOKIE_CONSENT_ENABLED !== "false";
    
    if (isEnabled) {
      const hasConsent = document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookieConsent="));
      
      if (!hasConsent) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
  };

  const handleDecline = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('accept')}
      declineButtonText={t('decline')}
      cookieName="cookieConsent"
      cookieValue="accepted"
      declineCookieValue="declined"
      expires={365}
      enableDeclineButton={true}
      flipButtons={false}
      onAccept={handleAccept}
      onDecline={handleDecline}
      style={{
        background: "#1e293b",
        color: "#f8fafc",
        fontSize: "16px",
        padding: "20px",
        boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      buttonStyle={{
        backgroundColor: "#0d9488",
        color: "#1e293b",
        fontSize: "16px",
        fontWeight: "600",
        padding: "12px 24px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginLeft: "12px",
        transition: "background-color 0.2s ease",
      }}
      declineButtonStyle={{
        backgroundColor: "#64748b",
        color: "#f8fafc",
        fontSize: "16px",
        fontWeight: "600",
        padding: "12px 24px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginLeft: "12px",
        transition: "background-color 0.2s ease",
      }}
      contentStyle={{
        flex: "1 1 auto",
        marginRight: "20px",
        lineHeight: "1.5",
      }}
      containerClasses="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between max-w-none"
      contentClasses="text-slate-100"
      buttonClasses="hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      declineButtonClasses="hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      sameSite="strict"
      cookieSecurity={true}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="mb-4 sm:mb-0 sm:mr-6 flex-1">
          <p className="text-sm sm:text-base">
            {t('text')}{" "}
            <a 
              href="/privacy-policy"
              className="underline hover:text-teal-300 transition-colors"
            >
              {t('privacyLink')}
            </a>.
          </p>
        </div>
      </div>
    </CookieConsent>
  );
}