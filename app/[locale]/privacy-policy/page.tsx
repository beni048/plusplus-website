"use client";

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';

export default function PrivacyPage() {
  const t = useTranslations('privacyPolicy');
  const { trackCustomEvent } = useAnalytics();
  
  // Track reading milestones for compliance
  const readingTrackingRef = useRef({
    tracked25: false,
    tracked50: false,
    tracked75: false,
    tracked100: false,
    startTime: Date.now()
  });

  useEffect(() => {
    // Track page access for legal compliance
    trackCustomEvent('page_view', 'legal_compliance', {
      component_id: 'privacy_policy_page',
      component_type: 'legal_page',
      page_type: 'privacy_policy',
      legal_document: 'privacy_policy',
      compliance_tracking: true,
      access_timestamp: Date.now()
    });

    let ticking = false;

    // Enhanced scroll tracking for legal compliance
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          const scrollPercent = Math.round((scrolled / (documentHeight - windowHeight)) * 100);
          const tracking = readingTrackingRef.current;

          // Track reading milestones for compliance audit
          if (scrollPercent >= 25 && !tracking.tracked25) {
            trackCustomEvent('scroll_milestone', 'legal_compliance', {
              component_id: 'privacy_policy_reading',
              component_type: 'legal_document',
              scroll_percent: 25,
              reading_progress: 'quarter_read',
              time_to_milestone: Date.now() - tracking.startTime,
              compliance_metric: true
            });
            tracking.tracked25 = true;
          }
          
          if (scrollPercent >= 50 && !tracking.tracked50) {
            trackCustomEvent('scroll_milestone', 'legal_compliance', {
              component_id: 'privacy_policy_reading',
              component_type: 'legal_document',
              scroll_percent: 50,
              reading_progress: 'half_read',
              time_to_milestone: Date.now() - tracking.startTime,
              compliance_metric: true
            });
            tracking.tracked50 = true;
          }
          
          if (scrollPercent >= 75 && !tracking.tracked75) {
            trackCustomEvent('scroll_milestone', 'legal_compliance', {
              component_id: 'privacy_policy_reading',
              component_type: 'legal_document',
              scroll_percent: 75,
              reading_progress: 'three_quarters_read',
              time_to_milestone: Date.now() - tracking.startTime,
              compliance_metric: true
            });
            tracking.tracked75 = true;
          }
          
          if (scrollPercent >= 90 && !tracking.tracked100) {
            trackCustomEvent('scroll_complete', 'legal_compliance', {
              component_id: 'privacy_policy_reading',
              component_type: 'legal_document',
              scroll_percent: 100,
              reading_progress: 'fully_read',
              total_reading_time: Date.now() - tracking.startTime,
              compliance_metric: true,
              legal_document_completed: true,
              value: 100
            });
            tracking.tracked100 = true;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Track time spent on page for compliance
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      trackCustomEvent('page_time_spent', 'legal_compliance', {
        component_id: 'privacy_policy_page',
        component_type: 'legal_page',
        time_spent_ms: timeSpent,
        time_spent_seconds: Math.round(timeSpent / 1000),
        compliance_metric: true,
        engagement_level: timeSpent > 30000 ? 'high' : timeSpent > 10000 ? 'medium' : 'low'
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackCustomEvent]);

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              {t('intro')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section1.title')}</h2>
            <p className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('section1.content') }} />

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section2.title')}</h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection1.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection1.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection2.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection2.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection3.title')}</h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('section2.subsection3.content1')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('section2.subsection3.list.item1')}</li>
              <li>{t('section2.subsection3.list.item2')}</li>
            </ul>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection3.content2')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection4.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection4.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection5.title')}</h3>
            <p className="text-lg leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: t('section2.subsection5.content1') }} />
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection5.content2')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section3.title')}</h2>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('section3.list.item1')}</li>
              <li>{t('section3.list.item2')}</li>
              <li>{t('section3.list.item3')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section4.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section4.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section5.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section5.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section6.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section6.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section7.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section7.content')}
            </p>

            <p className="text-lg leading-relaxed font-medium text-black mt-8">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
