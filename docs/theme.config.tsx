const themeConfig = {
  docsRepositoryBase: 'https://github.com/pingcap/tidb.ai/tree/main/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s - TiDB.ai Docs',
    };
  },
  project: {
    link: 'https://github.com/pingcap/tidb.ai',
  },
  head: (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content='rag.TiDB.ai Docs' />
      <meta property='og:description' content='The docs site of rag.TiDB.ai' />
    </>
  ),
  logo: (
    <>
      <svg
        width='24'
        height='24'
        viewBox='0 0 745 745'
        fill='none'
        className='logo'
      >
        <rect width='745' height='745' rx='120' className='logo-bg' />
        <rect
          x='298'
          y='172'
          width='150'
          height='150'
          rx='24'
          className='logo-circle'
        />
        <rect
          x='298'
          y='422'
          width='150'
          height='150'
          rx='24'
          className='logo-circle'
        />
      </svg>
      <span style={{ marginLeft: '.5em', fontWeight: 800, fontSize: '20px' }}>
        RAG Documentation
      </span>
    </>
  ),
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{' '}
        <a href='https://pingcap.com' target='_blank'>
          PingCAP
        </a>
        .
      </span>
    ),
  },
  // ... other theme options
};

export default themeConfig;
