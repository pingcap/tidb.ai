import './App.css';
import { getPublicSiteSettings, type PublicWebsiteSettings } from '@/api/site-settings';

import { useEffect, useState } from 'react';
import { Widget } from './Widget';

function App () {
  const [settings, setSettings] = useState<PublicWebsiteSettings>();

  useEffect(() => {
    getPublicSiteSettings().then(setSettings).catch(error => {
      console.error('Cannot initialize tidb.ai widget', error);
    });
  }, []);

  if (!settings) {
    return null;
  }
  return (
    <Widget
      exampleQuestions={settings.custom_js_example_questions}
      buttonLabel={settings.custom_js_button_label}
      buttonIcon={settings.custom_js_button_img_src}
      icon={settings.custom_js_logo_src}
    />
  );
}

export default App;
