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
  tidbAiWidgetScript?.getAttribute('data-logo-src') ||
  undefined;

// console.log('myScript ===', myScript, myScript?.getAttribute('data-id'));

const body = document.getElementsByTagName('body')[0];
body.appendChild(document.createElement('div')).id = 'tidb-ai-root';

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
    />
  </React.StrictMode>
);
