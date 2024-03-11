import { styled, css } from '@mui/system';
import { Button as BaseButton } from '@mui/base/Button';

export const TriggerButton = styled('button')(({ theme }) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: `'IBM Plex Sans', sans-serif`,
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    padding: '8px 16px',
    borderRadius: theme.shape.borderRadius,
    transition: 'all 150ms ease',
    cursor: 'pointer',
    background: theme.palette.background,
    border: `1px solid ${theme.palette.border}`,
    color: theme.palette.primary,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    '&:hover': {
      // background: theme.palette.mode === 'dark' ? dark.border : grey[50],
      borderColor: theme.palette.ring,
    },
    '&:active': {
      // background: theme.palette.mode === 'dark' ? grey[700] : grey[100],
      borderColor: theme.palette.ring,
    },
    // '&:focus-visible': {
    //   boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]}`,
    //   outline: 'none',
    // },
  })
);

export const ChatActionButton = styled(BaseButton)(({ theme }) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: `'IBM Plex Sans', sans-serif`,
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    backgroundColor: theme.palette.muted,
    padding: '8px 16px',
    borderRadius: '8px',
    color: theme.palette.primary,
    transition: 'all 150ms ease',
    cursor: 'pointer',
    border: `2px solid ${theme.shape.borderRadius}`,
    '&:hover': {
      borderColor: theme.palette.ring,
    },
    '&.Mui-focusVisible': {
      outline: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.muted,
      color: 'grey',
      cursor: 'default',
      border: '0',
    },
  })
);
