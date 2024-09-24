import { GtagProvider } from '@/components/gtag-provider';
import ReactDOM from 'react-dom/client';
import { loadConfig } from './load-config';
import { prepareGtag } from './prepare-gtag';
import { Widget, type WidgetInstance } from './Widget';

const script = document.currentScript;
if (!script) {
  throw new Error('Cannot locate document.currentScript');
}

const controlled = script.dataset.controlled === 'true';
const trigger = controlled ? true : document.getElementById('tidb-ai-trigger');
const chatEngine = script.dataset.chatEngine;

loadConfig().then(async ({ settings, bootstrapStatus, experimentalFeatures }) => {
  const gtagFn = settings.ga_id ? prepareGtag(settings.ga_id) : undefined;
  const div = document.createElement('div');

  div.id = 'tidb-ai-widget';
  div.className = 'tidb-ai-widget';
  document.body.appendChild(div);

  const refFn = (current: WidgetInstance) => {
    Object.defineProperty(window, 'tidbai', {
      writable: false,
      value: current,
    });
    window.dispatchEvent(new CustomEvent('tidbaiinitialized', { detail: current }));
  };

  ReactDOM.createRoot(div).render(
    <GtagProvider configured gtagFn={gtagFn} gtagId={settings.ga_id}>
      <Widget
        ref={refFn}
        container={div}
        trigger={trigger}
        exampleQuestions={settings.custom_js_example_questions}
        buttonLabel={settings.custom_js_button_label}
        buttonIcon={settings.custom_js_button_img_src}
        icon={settings.custom_js_logo_src}
        bootstrapStatus={bootstrapStatus}
        experimentalFeatures={experimentalFeatures}
        chatEngine={chatEngine}
      />
    </GtagProvider>,
  );
}).catch((error) => {
  console.error('Failed to initialize tidbai', error);
  Object.defineProperty(window, 'tidbai', {
    writable: false,
    value: {
      open: false,
      dark: false,
      initialized: false,
      error,
    },
  });
  window.dispatchEvent(new CustomEvent('tidbaierror', { detail: error }));
});
