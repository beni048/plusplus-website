'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const t = useTranslations('Dashboard');
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.refresh(); // Refresh to update server components (trigger redirect)
            router.push('/login'); // Fallback/Explicit redirect
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            {t('logout')}
        </button>
    );
}
