import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-primary font-medium text-black mb-8">
            {t('title')}
          </h1>
          
          {/* Development Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> This page is currently in development. All content shown is placeholder text and subject to change.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 text-neutral-dark">
            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('scope.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('scope.text1')}</p>
                <p className="font-secondary text-base">{t('scope.text2')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('contractConclusion.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('contractConclusion.text1')}</p>
                <p className="font-secondary text-base">{t('contractConclusion.text2')}</p>
                <p className="font-secondary text-base">{t('contractConclusion.text3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('services.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('services.text1')}</p>
                <p className="font-secondary text-base">{t('services.text2')}</p>
                <p className="font-secondary text-base">{t('services.text3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('prices.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('prices.text1')}</p>
                <p className="font-secondary text-base">{t('prices.text2')}</p>
                <p className="font-secondary text-base">{t('prices.text3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('liability.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('liability.text1')}</p>
                <p className="font-secondary text-base">{t('liability.text2')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('dataProtection.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('dataProtection.text1')}</p>
                <p className="font-secondary text-base">{t('dataProtection.text2')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('applicableLaw.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('applicableLaw.text1')}</p>
                <p className="font-secondary text-base">{t('applicableLaw.text2')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('changes.title')}</h2>
              <p className="font-secondary text-base">{t('changes.text')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('contact.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary text-base">{t('contact.companyName')}</p>
                <p className="font-secondary text-base">{t('contact.street')}</p>
                <p className="font-secondary text-base">{t('contact.city')}</p>
                <p className="font-secondary text-base">{t('contact.country')}</p>
                <p className="font-secondary text-base"><strong className="font-primary">Email:</strong> {t('contact.email')}</p>
                <p className="font-secondary text-base"><strong className="font-primary">Telefon:</strong> {t('contact.phone')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}