import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const tidbAiWidgetScript = document.querySelector(
  'script[data-id][data-name="tidb-ai-widget"]'
);
const tidbAiWidgetScriptId =
  tidbAiWidgetScript?.getAttribute('data-id') || 'tidb-ai-widget';
const tidbAiWidgetScriptName =
  tidbAiWidgetScript?.getAttribute('data-name') || 'tidb-ai-widget';
const tidbAiWidgetBtnLabel =
  tidbAiWidgetScript?.getAttribute('data-btn-label') || 'Ask AI';
const tidbAiWidgetBtnImgSrc =
  tidbAiWidgetScript?.getAttribute('data-btn-img-src') || undefined;
const tidbAiWidgetAPIBaseURL =
  tidbAiWidgetScript?.getAttribute('data-api-base-url') || undefined;
const tidbAiWidgetExampleQuestions = JSON.parse(
  tidbAiWidgetScript?.getAttribute('data-example-questions') || '[]'
);
const tidbAiWidgetLogoSrc =
  tidbAiWidgetScript?.getAttribute('data-logo-src') || undefined;
const tidbAiWidgetTitle =
  tidbAiWidgetScript?.getAttribute('data-title') || 'Conversation Search Box';
const tidbAiWidgetInputPlaceholder =
  tidbAiWidgetScript?.getAttribute('data-input-placeholder') ||
  'Ask a question...';
const tidbAiWidgetPreferredMode =
  tidbAiWidgetScript?.getAttribute('data-preferred-mode') || 'system';
const tidbAiWidgetSiteKey =
  tidbAiWidgetScript?.getAttribute('data-site-key') || '';
const tidbAiWidgetSecurityMode =
  tidbAiWidgetScript?.getAttribute('data-security-mode') || undefined;

const body = document.getElementsByTagName('body')[0];
body.appendChild(document.createElement('div')).id = 'tidb-ai-root';

const head = document.getElementsByTagName('head')[0];
// add recaptcha to head
if (tidbAiWidgetSiteKey) {
  const recaptchaScript = document.createElement('script');
  const recaptchaSrc =
    tidbAiWidgetSecurityMode === 'enterprise'
      ? `https://www.google.com/recaptcha/enterprise.js?render=${tidbAiWidgetSiteKey}`
      : `https://www.google.com/recaptcha/api.js?render=${tidbAiWidgetSiteKey}`;
  recaptchaScript.src = recaptchaSrc;
  recaptchaScript.async = true;
  recaptchaScript.defer = true;
  head.appendChild(recaptchaScript);
}

ReactDOM.createRoot(document.getElementById('tidb-ai-root')!).render(
  <React.StrictMode>
    <App
      id={tidbAiWidgetScriptId}
      name={tidbAiWidgetScriptName}
      btnLabel={tidbAiWidgetBtnLabel}
      btnImgSrc={tidbAiWidgetBtnImgSrc}
      baseUrl={tidbAiWidgetAPIBaseURL}
      exampleQuestions={tidbAiWidgetExampleQuestions}
      logoSrc={tidbAiWidgetLogoSrc}
      title={tidbAiWidgetTitle}
      inputPlaceholder={tidbAiWidgetInputPlaceholder}
      preferredMode={tidbAiWidgetPreferredMode}
      siteKey={tidbAiWidgetSiteKey}
      securityMode={tidbAiWidgetSecurityMode}
    />
  </React.StrictMode>
);
