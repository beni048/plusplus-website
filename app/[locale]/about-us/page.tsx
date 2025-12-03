'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';

export default function AboutUs() {
    const t = useTranslations('aboutUs');

    const teamMembers = [
        {
            id: 'benjamin',
            image: '/images/team/benjamin_grey.png',
            scale: 1.6,
            yOffset: '11%',
            xOffset: '0%',
        },
        {
            id: 'matthias',
            image: '/images/team/matthias_grey.png',
            scale: 1.05,
            yOffset: '-2%',
            xOffset: '2%',
        },
        {
            id: 'jonas',
            image: null, // Placeholder
            scale: 1,
            yOffset: '0%',
            xOffset: '0%',
        },
        {
            id: 'roger',
            image: '/images/team/Roger.jpg',
            scale: 1.5,
            yOffset: '16%',
            xOffset: '6%',
        },
        {
            id: 'andreas',
            image: '/images/team/andreas.PNG',
            scale: 2.1,
            yOffset: '26%',
            xOffset: '3%',
        },
        {
            id: 'magdalena',
            image: '/images/team/Magda_black.png',
            scale: 1.5,
            yOffset: '16%',
            xOffset: '0%',
        },
    ];

    return (
        <main className="min-h-screen bg-neutral-light pt-32">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6">
                                <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full bg-gray-200 shadow-md">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={t(`team.${member.id}.name`)}
                                            fill
                                            className="object-cover grayscale"
                                            style={{ transform: `scale(${member.scale}) translateY(${member.yOffset}) translateX(${member.xOffset})` }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400">
                                            <span className="text-4xl font-bold opacity-20">
                                                {t(`team.${member.id}.name`).split(' ').map((n: string) => n[0]).join('')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-left w-full">
                                    <h3 className="text-xl font-primary font-bold text-black mb-2 text-center">
                                        {t(`team.${member.id}.name`)}
                                    </h3>
                                    <p className="text-accent-red font-medium mb-4 text-sm uppercase tracking-wider text-center">
                                        {t(`team.${member.id}.role`)}
                                    </p>
                                    <p className="text-neutral-dark font-secondary text-sm leading-relaxed">
                                        {t(`team.${member.id}.description`)}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
