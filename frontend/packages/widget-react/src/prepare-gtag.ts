export function prepareGtag (gtagId: string) {
  try {
    gtag('config', gtagId, {
      send_page_view: false,
    });
    return true;
  } catch (e) {
    console.debug('[tidbai.widget] gtag id provided but gtag script not initialized.', e);
    return false;
  }
}
