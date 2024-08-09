import { Button, type ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { forwardRef, useTransition } from 'react';

export interface LinkButtonProps extends ButtonProps {
  href: string;
  replace?: boolean;
  scroll?: boolean;
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(({ href, replace, scroll, disabled, ...props }, ref) => {
  const [navigating, startNavigation] = useTransition();
  const router = useRouter();

  return (
    <Button
      {...props}
      disabled={disabled || navigating}
      onClick={event => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          startNavigation(() => {
            if (replace) {
              router.replace(href, { scroll });
            } else {
              router.push(href, { scroll });
            }
          });
        }
      }}
    />
  );
});

LinkButton.displayName = 'LinkButton';
