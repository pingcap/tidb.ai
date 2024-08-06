import './App.css';
import { getPublicSiteSettings, type PublicWebsiteSettings } from '@/api/site-settings';
import { type BootstrapStatus, getBootstrapStatus, type RequiredBootstrapStatus } from '@/api/system';

import { useEffect, useState } from 'react';
import { Widget } from './Widget';

function App () {
  const [settings, setSettings] = useState<PublicWebsiteSettings>();
  const [bootstrapStatus, setBootstrapStatus] = useState<BootstrapStatus>();

  useEffect(() => {
    getPublicSiteSettings().then(setSettings).catch(error => {
      console.error('Cannot initialize tidb.ai widget', error);
    });
    getBootstrapStatus().then(setBootstrapStatus).catch(error => {
      console.error('Cannot initialize tidb.ai widget', error);
    });
  }, []);

  if (!settings || !bootstrapStatus) {
    return null;
  }
  return (
    <Widget
      exampleQuestions={settings.custom_js_example_questions}
      buttonLabel={settings.custom_js_button_label}
      buttonIcon={settings.custom_js_button_img_src}
      icon={settings.custom_js_logo_src}
      bootstrapStatus={bootstrapStatus}
    />
  );
}

export default App;
