export function prepareGtag (gtagId: string, needConfig: boolean) {
  try {
    if (needConfig) {
      gtag('config', gtagId, {
        send_page_view: false,
      });
    }
    return true;
  } catch (e) {
    console.debug('[tidbai.widget] gtag id provided but gtag script not initialized.', e);
    return false;
  }
}
