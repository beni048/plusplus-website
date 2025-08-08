"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { 
  optOutAnalytics, 
  optInAnalytics, 
  getOptOutStatus, 
  requestDataDeletion, 
  updateConsent 
} from '@/lib/gtag';

export default function PrivacyControls() {
  const t = useTranslations('privacy');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setAnalyticsEnabled(!getOptOutStatus());
  }, []);

  const handleAnalyticsToggle = (enabled: boolean) => {
    if (enabled) {
      optInAnalytics();
    } else {
      optOutAnalytics();
    }
    setAnalyticsEnabled(enabled);
  };

  const handleDataDeletion = () => {
    requestDataDeletion();
    setAnalyticsEnabled(false);
    alert(t('dataDeletionConfirmation'));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('controlsTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Essential Cookies */}
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex-1">
            <Label className="text-base font-medium text-green-800">{t('essentialCookies')}</Label>
            <p className="text-sm text-green-700 mt-1">
              {t('essentialCookiesDescription')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              {t('alwaysActive')}
            </span>
            <Switch checked={true} disabled />
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1">
            <Label className="text-base font-medium">{t('analytics')}</Label>
            <p className="text-sm text-gray-600 mt-1">
              {t('analyticsDescription')}
            </p>
          </div>
          <Switch
            checked={analyticsEnabled}
            onCheckedChange={handleAnalyticsToggle}
          />
        </div>

        {/* Data Deletion */}
        <div className="border-t pt-4 mt-6">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex-1">
              <Label className="text-base font-medium text-red-800">{t('deleteAllData')}</Label>
              <p className="text-sm text-red-700 mt-1">
                {t('deleteAllDataDescription')}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-accent-orange hover:bg-accent-orange/90 text-white" size="sm">
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
                    className="bg-accent-orange hover:bg-accent-orange/90 text-white"
                  >
                    {t('confirmDelete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
