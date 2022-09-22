import * as atoms from '@/app/store'
import { extendTheme } from '@chakra-ui/react'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

/**
 * a custom hook to switch between light mode and dark mode
 * @default "dark"
 * @returns
 */
// const useTheme = () => {
//   const [theme, setTheme] = useAtom(atoms.themeAtom)
//   const toggleTheme = () => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))

//   useEffect(() => {
//     document.documentElement.className = theme
//   }, [theme])

//   return {
//     theme,
//     toggleTheme
//   }
// }
const useTheme = () => {
  const [theme, setTheme] = useAtom(atoms.themeAtom)
  // const toggleTheme = () => setTheme((theme) => theme.)
  if (!theme) {
    setTheme(extendTheme({
      config: {
        initialColorMode: 'light',
        useSystemColorMode: false
      },
      global: {
        svg: {
          display: 'inline'
        }
      }
    }))
  }
  return { theme }
}

export default useTheme
