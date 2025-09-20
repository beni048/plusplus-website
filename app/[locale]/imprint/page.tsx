import { useTranslations } from 'next-intl';

export default function ImpressumPage() {
  const t = useTranslations('impressum');

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-primary font-medium text-black mb-8">
            {t('title')}
          </h1>
          
          <div className="space-y-8 text-neutral-dark">
            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('company.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary text-base"><strong className="font-primary">{t('company.name')}:</strong> {t('company.companyName')}</p>
                <p className="font-secondary text-base"><strong className="font-primary">{t('company.address')}:</strong></p>
                <p className="font-secondary text-base">{t('company.street')}</p>
                <p className="font-secondary text-base">{t('company.city')}</p>
                <p className="font-secondary text-base">{t('company.country')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('contact.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary text-base"><strong className="font-primary">{t('contact.email')}:</strong> {t('contact.emailAddress')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('legal.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary text-base"><strong className="font-primary">{t('legal.registry')}:</strong> {t('legal.registryValue')}</p>
                <p className="font-secondary text-base"><strong className="font-primary">{t('legal.uid')}:</strong> {t('legal.uidValue')}</p>
                <p className="font-secondary text-base"><strong className="font-primary">{t('legal.vatNumber')}:</strong> {t('legal.vatValue')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('disclaimer.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-base">{t('disclaimer.content')}</p>
                <p className="font-secondary text-base">{t('disclaimer.liability')}</p>
                <p className="font-secondary text-base">{t('disclaimer.links')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('copyright.title')}</h2>
              <p className="font-secondary text-base">{t('copyright.text')}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}