const themeConfig = {
  docsRepositoryBase: 'https://github.com/pingcap/tidb.ai/tree/main/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s - RAG by TiDB ',
    };
  },
  project: {
    link: 'https://github.com/pingcap/tidb.ai',
  },
  chat: {
    link: 'https://discord.gg/XzSW23Jg9p',
  },
  navbar: {
    extraContent: (
      <>
        <a
          style={{ padding: "0.5rem" }}
          target="_blank"
          href="https://twitter.com/tidb_developer"
          aria-label="TiDB Developer Twitter"
          rel="nofollow noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-twitter"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
      </>
    ),
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
      <span style={{ marginLeft: '.5em', fontWeight: 300, fontSize: '20px' }}>
        TiDB.AI
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
