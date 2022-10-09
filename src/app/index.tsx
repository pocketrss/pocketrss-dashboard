import LayoutMain, { LayoutDashboard } from '@/layouts'
import { queryClient } from '@/utils/react-query'
import { LinkItemProps } from '@/types'

import { RiHome4Line, RiRssLine, RiNewspaperLine, RiHeart2Line } from 'react-icons/ri'
import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ChakraProvider, useDisclosure, theme } from '@chakra-ui/react'
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
  const [formValue, setFormValue] = useState<Object>({})

  return (
    <Suspense fallback={null}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route path='/signin' element={<SigninPage />} />
            </Route>
            <Route element={<LayoutDashboard linkItems={linkItems} />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<LayoutDashboard linkItems={linkItems} />}>
              <Route path='/feeds' element={<FeedPage />} />
              <Route path='/entries' element={<EntryPage />} />
              <Route path='/favor' element={<FavorPage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
        <ToastContainer />
      </ChakraProvider>
    </Suspense>
  )
}

export default PocketRSSApp
