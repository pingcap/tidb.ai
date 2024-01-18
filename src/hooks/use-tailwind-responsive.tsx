import tailwindConfig from '@/../tailwind.config';
import { useMediaQuery } from 'react-responsive';
import resolveConfig from 'tailwindcss/resolveConfig';

const resolvedTailwindConfig = resolveConfig(tailwindConfig);

type Config = typeof resolvedTailwindConfig;

const screens = resolvedTailwindConfig.theme.screens;
type Breakpoints = keyof typeof screens;
const breakpoints = Object.keys(screens) as Breakpoints[];

export function useTailwindResponsive () {
  return breakpoints.reduce((state: Record<Breakpoints, boolean>, breakpoint) => {
    state[breakpoint] = useMediaQuery({
      query: `(min-width: ${screens[breakpoint]})`,
    });
    return state;
  }, {} as Record<Breakpoints, boolean>);
}
