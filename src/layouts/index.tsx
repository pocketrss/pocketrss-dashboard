import { Outlet } from 'react-router-dom'
import { Center, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useSearchParam } from 'react-use'
import { useAtom } from 'jotai'

import { authAtom } from '@/app/store'
import { SidebarWithHeader } from '@/components'
import { useVerify } from '@/hooks'
import { LinkItemProps } from '@/types'

const LayoutMain = (): JSX.Element => {
  // const { getParams } = useQueryParams()
  // const { code, redirect_uri } = getParams()
  const code = useSearchParam('code')
  const redirect_uri = useSearchParam('redirect_uri') ?? ''
  console.log('redirect_uri: ', useSearchParam('redirect_uri'))

  const [auth] = useAtom(authAtom)
  if (!code) {
    window.location.href = '/oauth/authorize'
  }
  const { data, status, isError } = useVerify({ token: auth?.token, config: { useErrorBoundary: true } })
  useEffect(() => console.log('status:', status, ' isError:', isError), [status, isError])
  useEffect(() => {
    console.log('auth verifing...', data, '  code: ', code, '  redirect_uri: ', redirect_uri)
    if (data?.username === auth.username) {
      const url = redirect_uri?.length > 0 ? `${redirect_uri}?code=${code}` : '/'
      window.location.href = url
    }
  }, [data])

  return (
    <main>
      <Outlet />
    </main>
  )
}

export const LayoutDashboard = ({ linkItems }: { linkItems: Array<LinkItemProps> }): JSX.Element => {
  const [auth] = useAtom(authAtom)
  const { data, status } = useVerify({ token: auth?.token })
  const { pathname } = useLocation()

  useEffect(() => {
    if (status === 'success' && data?.username !== auth.username) {
      window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
    }
  }, [data, status, auth, pathname])

  return (
    <SidebarWithHeader linkItems={linkItems}>
      <Outlet />
    </SidebarWithHeader>
  )
}

export default LayoutMain
