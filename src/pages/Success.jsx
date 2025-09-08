import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Copy, Download, Home, Phone, Mail, Calendar } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import LanguageToggle from '../components/molecules/LanguageToggle';
import Button from '../components/atoms/Button';
import { ROUTES } from '../config/constants';
import MainLayout from '../components/layouts/MainLayout';

const Success = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const { submissionData, clearFormData } = useFormContext();
  const { addNotification } = useUIContext();
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!submissionData) {
      navigate(ROUTES.HOME);
    }
  }, [submissionData, navigate]);

  useEffect(() => {
    if (submissionData) {
      const timer = setTimeout(() => {
        clearFormData();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [submissionData, clearFormData]);

  const handleCopyReference = async () => {
    if (!submissionData?.referenceNumber) return;

    try {
      await navigator.clipboard.writeText(submissionData.referenceNumber);
      setCopySuccess(true);
      addNotification({
        type: 'success',
        message: t('pages.success.referenceCopied'),
        duration: 3000
      });
      
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      addNotification({
        type: 'error',
        message: t('pages.success.copyFailed'),
        duration: 3000
      });
    }
  };

  const handleDownloadConfirmation = () => {
    if (!submissionData) return;

    // Format dates based on current language
    const submittedDate = new Date(submissionData.submittedAt);
    const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
    
    // Create confirmation text content
    const confirmationText = `
${t('pages.success.confirmationTitle')}

${t('pages.success.referenceNumber')}: ${submissionData.referenceNumber}
${t('pages.success.submitted')}: ${submittedDate.toLocaleString(locale)}

${t('pages.success.applicationStatus')}: ${t('pages.success.statusReceived')}

${t('pages.success.confirmationMessage')}

${t('pages.success.nextStepsTitle')}:
- ${t('pages.success.nextStep1')}
- ${t('pages.success.nextStep2')}
- ${t('pages.success.nextStep3')}

${t('pages.success.contactInfoTitle')}:
${t('pages.success.phone')}: ${t('pages.success.phoneNumber')}
${t('pages.success.email')}: ${t('pages.success.emailAddress')}

${t('pages.success.thankYou')}
    `;

    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t('pages.success.confirmationFilename')}-${submissionData.referenceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success notification
    addNotification({
      type: 'success',
      message: t('pages.success.downloadSuccess'),
      duration: 3000
    });
  };

  if (!submissionData) {
    return (
      <MainLayout title={t('common.loading')} centered maxWidth="4xl">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('pages.success.loadingConfirmation')}</p>
        </div>
      </MainLayout>
    );
  }

  const submittedDate = new Date(submissionData.submittedAt);
  const expectedProcessingDate = new Date(submittedDate);
  expectedProcessingDate.setDate(expectedProcessingDate.getDate() + 10);
  
  return (
    <MainLayout
      headerActions={<LanguageToggle />}
      maxWidth="4xl"
      className="bg-gradient-to-br from-primary-50 to-blue-50"
    >
      <div className="py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('pages.success.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pages.success.description')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('pages.success.yourReferenceNumber')}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-3xl font-mono font-bold text-primary-600 mb-4">
                {submissionData.referenceNumber}
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyReference}
                  icon={<Copy className="w-4 h-4" />}
                  className={copySuccess ? 'border-green-300 text-green-700 bg-green-50' : ''}
                >
                  {copySuccess ? t('pages.success.copied') : t('common.copy')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadConfirmation}
                  icon={<Download className="w-4 h-4" />}
                >
                  {t('common.download')}
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              {t('pages.success.saveReferenceNote')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {t('pages.success.needHelp')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('pages.success.phoneSupport')}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {t('pages.success.phoneHours')}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${t('pages.success.phoneNumber')}`, '_self')}
              >
                {t('pages.success.phoneNumber')}
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('pages.success.emailSupport')}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {t('pages.success.emailResponse')}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`mailto:${t('pages.success.emailAddress')}`, '_self')}
              >
                {t('pages.success.emailAddress')}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(ROUTES.HOME)}
            icon={<Home className="w-5 h-5" />}
            className="mr-4"
          >
            {t('pages.success.returnToHome')}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Success;