import type { GtagFn } from '@/components/gtag-provider';

const DATA_LAYER_NAME = '__tidbai_dataLayer';

export function prepareGtag (id: string) {
  const dataLayer = window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];

  // IMPORTANT: gtag must take an IArguments as parameter.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fn = function (..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };

  fn('js', new Date());
  fn('config', id, { send_page_view: false });

  // To ensure not polluting the host gtag environments, we use an internal data layer variable in the widget project.
  // https://developers.google.com/tag-platform/tag-manager/datalayer#rename_the_data_layer
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}&l=${DATA_LAYER_NAME}`;
  script.async = true;

  document.body.append(script);

  return fn as GtagFn;
}
