import { Outlet } from 'react-router-dom'
import { Center, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useSearchParam } from 'react-use'
import { useAtom } from 'jotai'

import { authAtom } from '@/app/store'
import { SidebarWithHeader } from '@/components'
import { useVerify } from '@/hooks'
import { LinkItemProps } from '@/types'
import { isEmpty } from 'rambda'

const LayoutMain = (): JSX.Element => {
  // const { getParams } = useQueryParams()
  // const { code, redirect_uri } = getParams()
  const code = useSearchParam('code')
  const redirect_uri = useSearchParam('redirect_uri') ?? '/'

  const [auth] = useAtom(authAtom)

  // if (isEmpty(code) && isEmpty(auth?.token)) {
  //   window.location.href = '/oauth/authorize?redirect_uri=/signin'
  // }
  // const { data } = useVerify({ token: auth?.token })

  // useEffect(() => {
  //   console.log('data:', data)
  //   // if (data?.username !== 'anonymous' && data?.username === auth.username) {
  //   //   const url = redirect_uri?.length > 0 ? `${redirect_uri}?code=${code}` : '/'
  //   //   window.location.href = url
  //   // }
  // }, [data])

  useEffect(() => {
    if (isEmpty(auth?.token)) {
      if (isEmpty(code)) {
        window.location.href = '/oauth/authorize?redirect_uri=/signin'
      }
      return
    }
    window.location.href = redirect_uri
  }, [auth, code])

  return (
    <main>
      <Outlet />
    </main>
  )
}

export const LayoutDashboard = ({ linkItems }: { linkItems: Array<LinkItemProps> }): JSX.Element => {
  const [auth, setAuth] = useAtom(authAtom)
  const { data } = useVerify({ token: auth?.token })
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('data: ', data, data?.code === 2000)
    if (isEmpty(auth.username) && !isEmpty(data?.username)) {
      setAuth({ ...auth, username: data?.username })
    }
    if (data?.code !== 200) {
      // window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
    }
    // if (status === 'success') {
    //   if (data?.username === 'anonymous') {
    //     return
    //   }
    // }
    // window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
  }, [data, status, pathname])

  return (
    <SidebarWithHeader linkItems={linkItems}>
      <Outlet />
    </SidebarWithHeader>
  )
}

export default LayoutMain
