"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { 
  optOutAnalytics, 
  optInAnalytics, 
  getOptOutStatus, 
  requestDataDeletion, 
  updateConsent 
} from '@/lib/gtag';
import { useAnalytics } from '@/hooks/use-analytics';

// Get debug mode from environment
const GA_DEBUG_MODE = typeof window !== 'undefined' ? false : false; // Will be replaced by build-time check

interface PrivacyControlsProps {
  className?: string;
  onSettingChange?: (settingType: string, settingValue: any, additionalContext?: any) => void;
}

export default function PrivacyControls({ className = '', onSettingChange }: PrivacyControlsProps) {
  const t = useTranslations('privacy');
  const { trackPrivacyAction, trackCustomEvent } = useAnalytics();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [analyticsOptedOut, setAnalyticsOptedOut] = useState(false);
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const storedPreferences = localStorage.getItem('cookie-preferences');
    
    setCookiesAccepted(consent === 'accepted');
    
    if (storedPreferences) {
      try {
        const preferences = JSON.parse(storedPreferences);
        setAnalyticsOptedOut(!preferences.analytics);
      } catch (error) {
        console.error('Failed to parse cookie preferences:', error);
        setAnalyticsOptedOut(getOptOutStatus());
      }
    } else {
      setAnalyticsOptedOut(getOptOutStatus());
    }
  }, []);

  const handleAnalyticsToggle = (enabled: boolean) => {
    const previousOptedOut = analyticsOptedOut;
    
    // Update cookie preferences to include analytics choice
    const newPreferences = {
      necessary: true,
      analytics: enabled,
    };
    
    trackCustomEvent('toggle_analytics_tracking', 'privacy_compliance', {
      component_id: 'privacy_controls_analytics_toggle',
      component_type: 'toggle_switch',
      opted_out: !enabled,
      previous_opted_out: previousOptedOut
    });
    
    if (enabled) {
      // Enable analytics and update consent status
      optInAnalytics();
      trackPrivacyAction('opt_in', 'privacy_controls_analytics_optin');
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
      updateConsent(true);
      setCookiesAccepted(true);
    } else {
      // Disable analytics but keep essential cookies
      optOutAnalytics();
      trackPrivacyAction('opt_out', 'privacy_controls_analytics_optout');
      localStorage.setItem('cookie-consent', 'declined');
      localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
      updateConsent(false);
    }
    
    setAnalyticsOptedOut(!enabled);
    
    if (onSettingChange) {
      onSettingChange('analytics_tracking', enabled, {
        previous_opted_out: previousOptedOut
      });
    }
  };

  const handleDataDeletion = () => {
    trackCustomEvent('request_data_deletion', 'privacy_compliance', {
      component_id: 'privacy_controls_delete_button',
      component_type: 'deletion_action',
      deletion_confirmed: true,
      gdpr_compliance: true
    });
    
    requestDataDeletion();
    trackPrivacyAction('delete_data', 'privacy_controls_deletion_confirmed');
    setCookiesAccepted(false);
    setAnalyticsOptedOut(true);
    setShowDeletionConfirm(false);
    
    alert('All your data has been deleted successfully.');
  };

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Essential Cookies */}
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex-1 pr-6">
            <Label className="text-base font-medium text-green-800">Essential Cookies</Label>
            <p className="text-sm text-green-700 mt-1">
              Required for website functionality and security
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              Always On
            </span>
            <Switch
              checked={true}
              disabled
              className="opacity-70"
            />
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1 pr-6">
            <Label className="text-base font-medium text-gray-900">Analytics</Label>
            <p className="text-sm text-gray-600 mt-1">
              Help improve our website with anonymous usage data
            </p>
          </div>
          <div className="flex-shrink-0">
            <Switch
              checked={!analyticsOptedOut}
              onCheckedChange={handleAnalyticsToggle}
            />
          </div>
        </div>

        {/* Data Deletion */}
        <div className="border-t pt-4 mt-6">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex-1 pr-6">
              <Label className="text-base font-medium text-red-800">Delete All Data</Label>
              <p className="text-sm text-red-700 mt-1">
                Permanently remove all stored preferences and data
              </p>
            </div>
            <div className="flex-shrink-0">
              <AlertDialog open={showDeletionConfirm} onOpenChange={setShowDeletionConfirm}>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="bg-accent-orange hover:bg-accent-orange/90 text-white"
                    size="sm"
                  >
                    Delete Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your stored preferences and tracking data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDataDeletion}
                      className="bg-accent-orange hover:bg-accent-orange/90 text-white"
                    >
                      Delete All Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
