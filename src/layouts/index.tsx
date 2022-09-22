import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  UseDisclosureProps,
  useToast,
  CircularProgress,
} from '@chakra-ui/react'
import { Suspense, useEffect } from 'react'
import { KyResponse } from 'ky'
import { useLocation, useQueryParams, usePrevious } from 'react-recipes'
import { useAtom } from 'jotai'

import { authAtom } from '@/app/store'
import { FeedForm, EntryForm, SidebarWithHeader, ErrorBoundary } from '@/components'
import { useVerify, mutateFeed } from '@/hooks'
import { Dict, LinkItemProps } from '@/types'

const LayoutMain = (): JSX.Element => {
  const { getParams } = useQueryParams()
  const { code, redirect_uri } = getParams()
  const [auth] = useAtom(authAtom)
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

export const LayoutDashboard = ({
  linkItems,
  disclosure,
  formType,
  formValue,
  onSetFormValue,
}: {
  linkItems: Array<LinkItemProps>
  disclosure: UseDisclosureProps
  formType: number
  formValue: any
  onSetFormValue: any
}): JSX.Element => {
  const [auth] = useAtom(authAtom)
  const { data, status } = useVerify({ token: auth?.token })
  const { pathname } = useLocation()
  const prevStatus = usePrevious(status)

  let form: JSX.Element
  let mutation: UseMutationResult<KyResponse, unknown, Dict, unknown> = mutateFeed()

  useEffect(() => {
    console.log('status...', status)

    // switch (status) {
    //   case 'loading':
    //     // console.log('loading...')
    //     break
    //   case 'success':
    //     if (data?.username !== auth.username) {
    //       window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
    //     }

    //     break
    //   default:
    //     // if (data?.username !== auth.username) {
    //     //   window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
    //     // }

    //     break
    // }

    if (status === 'success' && data?.username !== auth.username) {
      window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
    }
  }, [data, status, prevStatus, auth, pathname])

  switch (formType) {
    case 1:
      form = <FeedForm feed={formValue} onFormValueChanged={onSetFormValue} />
      mutation = mutateFeed()
      break
    case 2:
      form = <EntryForm entry={formValue} />
      break
    default:
      form = <Text>Not immplenment</Text>
      break
  }
  const toast = useToast()

  return (
    <SidebarWithHeader linkItems={linkItems}>
      {/* <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}> */}
      <Outlet />
      {/* </Suspense>
      </ErrorBoundary> */}
      <Drawer
        isOpen={disclosure?.isOpen ?? false}
        placement='right'
        onClose={disclosure.onClose ?? function () {}}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>View data</DrawerHeader>
          <DrawerBody>{form}</DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={disclosure.onClose}>
              Cancel
            </Button>
            {mutation && (
              <Button
                colorScheme='blue'
                type='submit'
                onClick={async () => {
                  try {
                    const data = mutation.mutate(formValue)
                    toast({ title: 'success', status: 'success' })
                  } catch (err: unknown) {
                    toast({ title: 'failed', status: 'error', description: `${err}` })
                  }
                }}
                // onClick={onSubmit}
                // onClick={() => {
                //   mutation
                //     .mutateAsync(formValue)
                //     .then((resp) => {
                //       console.log(resp)
                //       toast({ title: 'success', status: 'success' })
                //       disclosure.onClose!()
                //     })
                //     .catch((err) => toast({ title: 'failed', status: 'error', description: err?.message }))
                // }}
              >
                Save
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarWithHeader>
  )
}

export default LayoutMain
