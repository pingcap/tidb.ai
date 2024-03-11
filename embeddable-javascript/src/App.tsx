import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/system';

import { TriggerButton } from './components/Button';
import {
  Modal,
  StyledBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from './components/Modal';
import ChatContainer from './components/Chatbot/ChatContainer';
import { lightTheme, darkTheme, themeClassPrefix } from './theme';
import { CfgContext } from './context';

function App(props: {
  id: string;
  name: string;
  btnLabel: string;
  btnImgSrc?: string;
  baseUrl?: string;
  exampleQuestions: string[];
  logoSrc?: string;
  title?: string;
  inputPlaceholder?: string;
  preferredMode?: 'dark' | 'light' | 'system' | string;
}) {
  const {
    btnLabel: entryButtonLabel,
    btnImgSrc,
    baseUrl = '',
    exampleQuestions,
    logoSrc,
    title: widgetTitle,
    inputPlaceholder,
    preferredMode: initialPreferredMode = 'system',
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputPreferredMode = ['dark', 'light'].includes(initialPreferredMode)
    ? initialPreferredMode
    : 'system';
  const browserPreferredMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const preferredMode =
    inputPreferredMode === 'system' ? browserPreferredMode : inputPreferredMode;

  const theme = React.useMemo(
    () => (preferredMode === 'dark' ? darkTheme : lightTheme),
    [preferredMode]
  );

  return (
    <CfgContext.Provider value={{ baseUrl, entryButtonLabel }}>
      <ThemeProvider theme={theme}>
        <TriggerButton
          type='button'
          onClick={handleOpen}
          className={themeClassPrefix + 'entry-btn'}
        >
          {btnImgSrc && (
            <img
              src={btnImgSrc}
              alt={entryButtonLabel}
              className={themeClassPrefix + 'entry-btn-img'}
              width={16}
              height={16}
            />
          )}
          {entryButtonLabel}
        </TriggerButton>
        <Modal
          aria-labelledby='unstyled-modal-title'
          aria-describedby='unstyled-modal-description'
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
          className={themeClassPrefix + 'Modal'}
        >
          <ModalContent
            sx={{
              width: '90vw',
              maxWidth: 800,
              minHeight: 400,
              height: '60vh',
            }}
            className={themeClassPrefix + 'Modal-Content'}
          >
            <ModalHeader className={themeClassPrefix + 'Modal-Header'}>
              <ModalTitle className={themeClassPrefix + 'Modal-Title'}>
                {logoSrc && (
                  <img src={logoSrc} alt='Widget Logo' width={32} height={32} />
                )}
                {widgetTitle}
              </ModalTitle>
            </ModalHeader>
            <ChatContainer
              exampleQuestions={exampleQuestions}
              inputPlaceholder={inputPlaceholder}
            />
          </ModalContent>
        </Modal>
      </ThemeProvider>
    </CfgContext.Provider>
  );
}

export default App;
