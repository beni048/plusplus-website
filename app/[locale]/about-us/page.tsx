'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';

export default function AboutUs() {
    const t = useTranslations('aboutUs');

    interface TeamMember {
        id: string;
        image: string;
        scale: number;
        yOffset: string;
        xOffset: string;
        linkedin: string;
        objectPosition?: string;
    }

    const teamMembers: TeamMember[] = [
        {
            id: 'benjamin',
            image: '/images/team/benjamin_bright.png',
            scale: 1.35,
            yOffset: '11%',
            xOffset: '-3%',
            linkedin: 'https://www.linkedin.com/in/rossibeni/',
        },
        {
            id: 'matthias',
            image: '/images/team/matthias_grey.png',
            scale: 1.05,
            yOffset: '-2%',
            xOffset: '2%',
            linkedin: 'https://www.linkedin.com/in/mat-nadler/',
        },
        {
            id: 'jonas',
            image: '/images/team/jonas_bright.png',
            scale: 1.3,
            yOffset: '6%',
            xOffset: '2%',
            linkedin: 'https://www.linkedin.com/in/jonas-w-791335a0/',
        },
        {
            id: 'roger',
            image: '/images/team/roger_extended_v2.png',
            scale: 1.8,
            yOffset: '5%',
            xOffset: '4%',
            linkedin: 'https://www.linkedin.com/in/roger-eichenberger-1093a5105/',
        },
        {
            id: 'andreas',
            image: '/images/team/andreas_2.PNG',
            scale: 2.25,
            yOffset: '19%',
            xOffset: '3%',
            linkedin: 'https://www.linkedin.com/in/andreas-b%C3%BChler-6530a52a/',
        },
        {
            id: 'magdalena',
            image: '/images/team/magdalena_grey.png',
            scale: 1.55,
            yOffset: '18%',
            xOffset: '0%',
            linkedin: 'https://www.linkedin.com/in/magdalena-bo%C5%A1ki%C4%87-446951a9/',
        },
        {
            id: 'lucas',
            image: '/images/team/lucas_grey.png',
            scale: 1.5,
            yOffset: '12%',
            xOffset: '0%',
            linkedin: 'https://www.linkedin.com/in/lucasbetschart/',
        },
        {
            id: 'luzius',
            image: '/images/team/luzius_grey.png',
            scale: 1.6,
            yOffset: '12%',
            xOffset: '3%',
            linkedin: 'https://www.linkedin.com/in/luziusmeisser/',
        },
    ];

    return (
        <main className="min-h-screen bg-neutral-light pt-32 pb-24">
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

                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
                                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6 h-full">
                                    <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full bg-gray-200 shadow-md">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={t(`team.${member.id}.name`)}
                                                fill
                                                className="object-cover grayscale"
                                                style={{
                                                    transform: `scale(${member.scale}) translateY(${member.yOffset}) translateX(${member.xOffset})`,
                                                    objectPosition: member.objectPosition || 'center'
                                                }}
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
                                    <div className="flex-grow">
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
                                    {member.linkedin && (
                                        <div className="w-full flex justify-end mt-4">
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#0077b5] hover:text-[#005582] font-medium inline-block text-sm"
                                            >
                                                {t('linkedinProfile')} ↗
                                            </a>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main >
    );
}
