import * as atoms from '@/app/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

/**
 * a custom hook to switch between light mode and dark mode
 * @default "dark"
 * @returns
 */
const useTheme = () => {
  const [theme, setTheme] = useAtom(atoms.themeAtom)
  const toggleTheme = () => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
