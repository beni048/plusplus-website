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

interface PrivacyControlsProps {
  className?: string;
}

export default function PrivacyControls({ className = '' }: PrivacyControlsProps) {
  const t = useTranslations('privacy');
  const { trackPrivacyAction } = useAnalytics();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [analyticsOptedOut, setAnalyticsOptedOut] = useState(false);
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);

  useEffect(() => {
    // Check current consent status
    const consent = localStorage.getItem('cookie-consent');
    setCookiesAccepted(consent === 'accepted');
    
    // Check opt-out status
    setAnalyticsOptedOut(getOptOutStatus());
  }, []);

  const handleCookieToggle = (enabled: boolean) => {
    if (enabled) {
      localStorage.setItem('cookie-consent', 'accepted');
      updateConsent(true);
      
      // Re-enable analytics if not opted out
      if (!analyticsOptedOut) {
        optInAnalytics();
      }
    } else {
      localStorage.setItem('cookie-consent', 'declined');
      updateConsent(false);
    }
    setCookiesAccepted(enabled);
  };

  const handleAnalyticsToggle = (enabled: boolean) => {
    if (enabled) {
      optInAnalytics();
      trackPrivacyAction('opt_in');
    } else {
      optOutAnalytics();
      trackPrivacyAction('opt_out');
    }
    setAnalyticsOptedOut(!enabled);
  };

  const handleDataDeletion = () => {
    requestDataDeletion();
    trackPrivacyAction('delete_data');
    setCookiesAccepted(false);
    setAnalyticsOptedOut(true);
    setShowDeletionConfirm(false);
    
    // Show confirmation to user
    alert(t('dataDeletionConfirmation'));
  };

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('controlsTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cookie Consent Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-medium">
              {t('cookieConsent')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('cookieConsentDescription')}
            </p>
          </div>
          <Switch
            checked={cookiesAccepted}
            onCheckedChange={handleCookieToggle}
          />
        </div>

        {/* Analytics Opt-out Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-medium flex items-center gap-2">
              {analyticsOptedOut ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {t('analyticsTracking')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('analyticsTrackingDescription')}
            </p>
          </div>
          <Switch
            checked={!analyticsOptedOut && cookiesAccepted}
            onCheckedChange={handleAnalyticsToggle}
            disabled={!cookiesAccepted}
          />
        </div>

        {/* Data Deletion */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                {t('deleteData')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('deleteDataDescription')}
              </p>
            </div>
            <AlertDialog open={showDeletionConfirm} onOpenChange={setShowDeletionConfirm}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  {t('deleteDataButton')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('deleteDataConfirmTitle')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('deleteDataConfirmDescription')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDataDeletion}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t('confirmDelete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Privacy Information */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="font-medium">{t('privacyInfo')}</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {t('privacyPoint1')}</li>
            <li>• {t('privacyPoint2')}</li>
            <li>• {t('privacyPoint3')}</li>
            <li>• {t('privacyPoint4')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
