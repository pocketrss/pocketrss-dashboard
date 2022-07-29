import { useTheme } from '@/hooks'
import Feed from '@/pages/feed'
import LayoutMain, { LayoutDashboard } from '@/layouts'
import { queryClient } from '@/utils/react-query'
import { LinkItemProps } from '@/types'

import { FiHome, FiLayers, FiRss, FiSettings, FiStar } from 'react-icons/fi'
import { Suspense, lazy, useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ChakraProvider, Text, theme, useDisclosure } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

const HomePage = lazy(() => import('@/pages').then((m) => ({ default: m.HomePage })))

// you can add Header, footer anything else you might want to, or else leave it to be
const StravitalApp = () => {
  // useTheme shold always on top of app
  // const { theme } = useTheme()
  const linkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, url: '/' },
    { name: 'Feeds', icon: FiRss, url: '/feeds' },
    { name: 'Entries', icon: FiLayers, url: '/entries' },
    { name: 'Favourites', icon: FiStar, url: '/' },
    { name: 'Settings', icon: FiSettings, url: '/' }
  ]
  const disclosure = useDisclosure()
  const [formType, setFormType] = useState<number>(1)
  const [formValue, setFormValue] = useState<Object>({})
  let location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case '/feeds':
        setFormType(1)
        break
      case '/entries':
        setFormType(2)
        break
      default:
        break
    }
  }, [location])

  return (
    <Suspense fallback={null}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route
              element={
                <LayoutDashboard
                  linkItems={linkItems}
                  disclosure={disclosure}
                  formType={formType}
                  formValue={formValue}
                  onSetFormValue={setFormValue}
                />
              }
            >
              <Route path='/feeds' element={<Feed disclosure={disclosure} onSetFormValue={setFormValue} />} />
              <Route path='/entries' element={<Text>{formType}</Text>} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </ChakraProvider>
    </Suspense>
  )
}

export default StravitalApp
