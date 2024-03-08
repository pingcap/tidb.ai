import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

export const Backdrop = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: Record<string, any>, ref: React.LegacyRef<HTMLDivElement>) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  }
);

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export const Modal = styled(BaseModal)({
  position: 'fixed',
  zIndex: 1300,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledBackdrop = styled(Backdrop)(({ theme }) =>
  css({
    zIndex: -1,
    position: 'fixed',
    inset: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)',
    WebkitTapHighlightColor: 'transparent',
  })
);

export const ModalContent = styled('div')(({ theme }) =>
  css({
    fontFamily: `'IBM Plex Sans', sans-serif`,
    fontWeight: 500,
    textAlign: 'start',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border}`,
    boxShadow: `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'}`,
    padding: '24px',
    color: theme.palette.primary,
    // '& .modal-title': {
    //   fontSize: '1.25rem',
    //   fontWeight: 600,
    //   fontFamily: `'IBM Plex Sans', sans-serif`,
    //   margin: 0,
    //   lineHeight: '1.5rem',
    //   marginBottom: '8px',
    // },
    // '& .modal-description': {
    //   margin: 0,
    //   lineHeight: '1.5rem',
    //   fontWeight: 400,
    //   color: theme.palette.muted,
    //   marginBottom: '4px',
    // },
  })
);

export const ModalHeader = styled('div')(({ theme }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    '& .modal-title': {
      fontSize: '1.25rem',
      fontWeight: 600,
      fontFamily: `'IBM Plex Sans', sans-serif`,
      margin: 0,
      lineHeight: '1.5rem',
      marginBottom: '8px',
    },
    '& .modal-description': {
      margin: 0,
      lineHeight: '1.5rem',
      fontWeight: 400,
      color: theme.palette.muted,
      marginBottom: '4px',
    },
  })
);

export const ModalTitle = styled('h2')(() =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.25rem',
    fontWeight: 600,
    fontFamily: `'IBM Plex Sans', sans-serif`,
    margin: 0,
    lineHeight: '1.5rem',
    marginBottom: '8px',
  })
);
