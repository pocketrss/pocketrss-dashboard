// import { useTheme } from '@/hooks'
import LayoutMain, { LayoutDashboard } from '@/layouts'
import { queryClient } from '@/utils/react-query'
import { LinkItemProps } from '@/types'
import { AuthProvider } from '@/hooks/useAuth'

import { FiHome, FiLayers, FiRss, FiSettings, FiStar } from 'react-icons/fi'
import { RiHome4Line, RiRssLine, RiNewspaperLine, RiHeart2Line, RiSettings4Line } from 'react-icons/ri'
import { Suspense, lazy, useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ChakraProvider, Text, useDisclosure, theme } from '@chakra-ui/react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { parse, stringify } from 'query-string';
import { QueryClientProvider } from '@tanstack/react-query'

const HomePage = lazy(() => import('@/pages').then((m) => ({ default: m.HomePage })))
const FeedPage = lazy(() => import('@/pages').then((m) => ({ default: m.FeedPage })))
const EntryPage = lazy(() => import('@/pages').then((m) => ({ default: m.EntryPage })))
const FavorPage = lazy(() => import('@/pages').then((m) => ({ default: m.FavorPage })))
const SigninPage = lazy(() => import('@/pages').then((m) => ({ default: m.SigninPage })))

// you can add Header, footer anything else you might want to, or else leave it to be
const PocketRSSApp = () => {
  // useTheme shold always on top of app
  // const { theme } = useTheme()
  const linkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: RiHome4Line, url: '/' },
    { name: 'Feeds', icon: RiRssLine, url: '/feeds' },
    { name: 'Entries', icon: RiNewspaperLine, url: '/entries' },
    { name: 'Favourites', icon: RiHeart2Line, url: '/favor' },
    // { name: 'Settings', icon: RiSettings4Line, url: '/' }
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
      case '/favor':
        setFormType(2)
        break
      default:
        break
    }
  }, [location])

  return (
    <Suspense fallback={null}>
      <AuthProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <QueryParamProvider
            adapter={ReactRouter6Adapter}
            option={{
              searchStringToObject: parse,
              objectToSearchString: stringify,
            }}
          >
          <Routes>
            <Route element={<LayoutMain />}>
              <Route path='/signin' element={<SigninPage />} />
            </Route>
            <Route element={<LayoutDashboard linkItems={linkItems} disclosure={disclosure} formType={formType} formValue={formValue} setFormValue={setFormValue} />}>
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
              <Route path='/feeds' element={<FeedPage disclosure={disclosure} onSetFormValue={setFormValue} />} />
              <Route path='/entries' element={<EntryPage disclosure={disclosure} onSetFormValue={setFormValue} />} />
              <Route path='/favor' element={<FavorPage disclosure={disclosure} onSetFormValue={setFormValue} />} />
            </Route>
          </Routes>
          </QueryParamProvider>
        </QueryClientProvider>
      </ChakraProvider>
      </AuthProvider>
    </Suspense>
  )
}

export default PocketRSSApp
