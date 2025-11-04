'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { ReactNode } from 'react';

interface ScheduleMeetingButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'icon-only';
  label?: string;
}

const HUBSPOT_MEETING_URL = 'https://meetings-eu1.hubspot.com/jonas-waelti?uuid=907baac1-ae5e-422b-9703-6d822d374dbe';

export default function ScheduleMeetingButton({
  children,
  className = '',
  variant = 'default',
  label,
}: ScheduleMeetingButtonProps) {
  const handleScheduleClick = () => {
    window.open(HUBSPOT_MEETING_URL, '_blank');
  };

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleScheduleClick}
        className={`inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
        aria-label={label || 'Schedule a meeting'}
      >
        <Calendar className="h-5 w-5" />
      </button>
    );
  }

  return (
    <Button
      onClick={handleScheduleClick}
      className={`bg-accent-red text-white px-8 py-4 text-lg hover:bg-accent-red/90 group transition-all duration-300 font-primary ${className}`}
    >
      {children || label || 'Schedule Meeting'}
    </Button>
  );
}
