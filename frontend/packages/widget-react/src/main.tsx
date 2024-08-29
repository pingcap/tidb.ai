import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadConfig } from './load-config';
import { Widget } from './Widget';

const { settings, bootstrapStatus } = await loadConfig();

ReactDOM.createRoot(document.getElementById('tidb-ai-widget')!).render(
  <React.StrictMode>
    <Widget
      exampleQuestions={settings.custom_js_example_questions}
      buttonLabel={settings.custom_js_button_label}
      buttonIcon={settings.custom_js_button_img_src}
      icon={settings.custom_js_logo_src}
      bootstrapStatus={bootstrapStatus}
    />
  </React.StrictMode>,
);
