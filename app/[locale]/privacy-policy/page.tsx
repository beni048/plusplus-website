"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacyPolicy');

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-3xl sm:text-4xl lg:text-5xl font-primary font-medium text-black px-4">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-dark px-4">
            <p className="font-secondary leading-relaxed mb-8 text-justify">
              {t('intro')}
            </p>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section1.title')}</h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify" dangerouslySetInnerHTML={{ __html: t('section1.content') }} />

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section2.title')}</h2>
            
            <h3 className="text-xl font-primary font-medium text-black mb-3 mt-6">{t('section2.subsection1.title')}</h3>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section2.subsection1.content')}
            </p>

            <h3 className="text-xl font-primary font-medium text-black mb-3 mt-6">{t('section2.subsection2.title')}</h3>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section2.subsection2.content')}
            </p>

            <h3 className="text-xl font-primary font-medium text-black mb-3 mt-6">{t('section2.subsection3.title')}</h3>
            <p className="font-secondary leading-relaxed mb-4 text-justify">
              {t('section2.subsection3.content1')}
            </p>
            <ul className="font-secondary leading-relaxed mb-6 ml-6 list-disc">
              <li className="text-justify">{t('section2.subsection3.list.item1')}</li>
              <li className="text-justify">{t('section2.subsection3.list.item2')}</li>
            </ul>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section2.subsection3.content2')}
            </p>

            <h3 className="text-xl font-primary font-medium text-black mb-3 mt-6">{t('section2.subsection4.title')}</h3>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section2.subsection4.content')}
            </p>

            <h3 className="text-xl font-primary font-medium text-black mb-3 mt-6">{t('section2.subsection5.title')}</h3>
            <p className="font-secondary leading-relaxed mb-2 text-justify" dangerouslySetInnerHTML={{ __html: t('section2.subsection5.content1') }} />
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section2.subsection5.content2')}
            </p>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section3.title')}</h2>
            <ul className="font-secondary leading-relaxed mb-6 ml-6 list-disc">
              <li className="text-justify">{t('section3.list.item1')}</li>
              <li className="text-justify">{t('section3.list.item2')}</li>
              <li className="text-justify">{t('section3.list.item3')}</li>
            </ul>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section4.title')}</h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section4.content')}
            </p>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section5.title')}</h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section5.content')}
            </p>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section6.title')}</h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section6.content')}
            </p>

            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">{t('section7.title')}</h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('section7.content')}
            </p>

            {/* Effective Date */}
            <div className="text-right mt-8">
              <p className="text-sm text-gray-600 font-secondary italic">
                {t('effective.title')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
