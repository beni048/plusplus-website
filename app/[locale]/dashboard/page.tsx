import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { SessionData, sessionOptions } from '@/lib/auth';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.user?.isLoggedIn) {
        redirect('/login');
    }

    const t = await getTranslations('Dashboard');

    return (
        <div className="min-h-screen bg-muted pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-primary text-gray-900">{t('title')}</h1>
                    <LogoutButton />
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">{t('welcome', { email: session.user.email })}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded p-4">
                            <h3 className="text-gray-500 mb-2">{t('balance')}</h3>
                            <p className="text-2xl font-bold">CHF 0.00</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">{t('transactions')}</h2>
                    <p className="text-gray-500 italic">{t('noTransactions')}</p>
                </div>
            </div>
        </div>
    );
}
