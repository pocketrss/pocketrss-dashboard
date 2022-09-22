// import { useTheme } from '@/hooks'
import LayoutMain, { LayoutDashboard } from '@/layouts'
import { ErrorBoundary } from '@/components'
import { queryClient } from '@/utils/react-query'
import { LinkItemProps } from '@/types'

import {
  RiHome4Line,
  RiRssLine,
  RiNewspaperLine,
  RiHeart2Line,
  RiSettings4Line,
  RiCloseCircleFill,
} from 'react-icons/ri'
import { Suspense, lazy, useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ChakraProvider, Text, useDisclosure, theme, CircularProgress } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { QueryClientProvider } from '@tanstack/react-query'

const HomePage = lazy(() => import('@/pages').then((m) => ({ default: m.HomePage })))
const FeedPage = lazy(() => import('@/pages').then((m) => ({ default: m.FeedPage })))
const EntryPage = lazy(() => import('@/pages').then((m) => ({ default: m.EntryPage })))
const FavorPage = lazy(() => import('@/pages').then((m) => ({ default: m.FavorPage })))
const SigninPage = lazy(() => import('@/pages').then((m) => ({ default: m.SigninPage })))

const { ToastContainer } = createStandaloneToast()

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
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* <ErrorBoundary>
            <Suspense fallback={<CircularProgress />}> */}
          <Routes>
            <Route element={<LayoutMain />}>
              <Route path='/signin' element={<SigninPage />} />
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
          {/* </Suspense>
          </ErrorBoundary> */}
        </QueryClientProvider>
        <ToastContainer />
      </ChakraProvider>
    </Suspense>
  )
}

export default PocketRSSApp
