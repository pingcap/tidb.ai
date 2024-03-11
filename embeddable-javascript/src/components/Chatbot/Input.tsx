import * as React from 'react';
import { styled, css } from '@mui/system';
// import { Input as BaseInput } from '@mui/base/Input';

import { SendIcon } from '../Icons';

export default function ChatInput(props: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
}) {
  const { placeholder, className, isLoading, ...rest } = props;

  return (
    <StyledChatInputWrapper className={className + '-Wrapper'}>
      {/* <Input
        placeholder='Say something...'
        autoFocus
        multiline
        rows={3}
        maxRows={3}
        {...props}
      /> */}
      <StyledChatInput
        placeholder={placeholder || 'Say something...'}
        autoFocus
        {...rest}
      />
      <StyledChatInputButton
        type='submit'
        className={className + '-Submit'}
        disabled={isLoading}
      >
        <SendIcon
          className={className + '-Submit-Icon'}
          sx={{
            width: '1rem',
            height: '1rem',
          }}
        />
      </StyledChatInputButton>
    </StyledChatInputWrapper>
  );
}

// export const Input = React.forwardRef<HTMLInputElement>(
//   function CustomInput(props, ref) {
//     return (
//       <BaseInput
//         slots={{
//           root: RootDiv,
//           input: 'input',
//           textarea: TextareaElement,
//         }}
//         {...props}
//         ref={ref}
//       />
//     );
//   }
// );

// const RootDiv = styled('div')({
//   display: 'flex',
//   maxWidth: '100%',
// });

// const TextareaElement = styled('textarea', {
//   shouldForwardProp: (prop) =>
//     !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
// })(({ theme }) =>
//   css({
//     width: '320px',
//     fontFamily: 'IBM Plex Sans, sans-serif',
//     fontSize: '0.875rem',
//     fontWeight: 400,
//     lineHeight: '1.5rem',
//     padding: '8px 12px',
//     borderRadius: '8px 8px 0 8px',
//     color: theme.palette.mode === 'dark' ? dark.primary : light.primary,
//     backgroundColor: theme.palette.mode === 'dark' ? dark.input : light.input,
//     border: `2px solid ${theme.palette.mode === 'dark' ? dark.border : light.border}`,
//     boxShadow: `0px 2px 4px ${
//       theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
//     }`,
//     '&:hover': {
//       outline: 'none',
//       borderColor: theme.palette.mode === 'dark' ? dark.ring : light.ring,
//     },
//     '&:focus': {
//       outline: 'none',
//       borderColor: theme.palette.mode === 'dark' ? dark.ring : light.ring,
//     },
//     // firefox
//     '&:focus-visible': {
//       outline: 0,
//     },
//   })
// );

const StyledChatInputWrapper = styled('div')(() =>
  css({
    display: 'flex',
    position: 'relative',
  })
);

const StyledChatInput = styled('input')(({ theme }) =>
  css({
    fontSize: '1rem',
    lineHeight: '1.5rem',
    padding: '0.5rem 0.75rem',
    paddingRight: '2.5rem',
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block',
    width: '100%',
    border: `2px solid ${theme.palette.border}`,
    color: theme.palette.primary,
    backgroundColor: theme.palette.background,
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.ring,
    },
  })
);

const StyledChatInputButton = styled('button')(({ theme, disabled }) =>
  css({
    position: 'absolute',
    right: '0.375rem',
    top: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    padding: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: theme.palette.primary,
    color: theme.palette.primaryForeground,
    '&:hover': {
      backgroundColor: theme.palette.primary,
    },
    ...(disabled && {
      backgroundColor: theme.palette.muted,
      color: theme.palette.mutedForeground,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: theme.palette.muted,
      },
    }),
  })
);

export const StyledChatMutedText = styled('span')(({ theme }) =>
  css({
    color: theme.palette.mutedForeground,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1,
  })
);
