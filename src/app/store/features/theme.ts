import { atomWithStorage } from 'jotai/utils'
import { extendTheme, theme as defaultTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react'
import { Dict } from '@/types';

const { orange } = defaultTheme.colors;

const theme = extendTheme(
  {
    colors: {
      brand: orange,
    },
    currentScheme: 'orange',
    shadows: {
      Input: {
        defaultProps: {
          focusBorderColor: orange[500],
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
  withDefaultVariant({ variant: 'filled', components: ['Input', 'Select'] }),
)

const themeAtom = atomWithStorage<Dict>('APP_THEME', theme)

export default themeAtom
