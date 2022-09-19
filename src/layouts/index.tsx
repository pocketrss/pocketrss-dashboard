import { SidebarWithHeader } from '@/components/sidebar'
import { useVerify } from '@/hooks'

import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'
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
} from '@chakra-ui/react'
import { LinkItemProps } from '@/types'
import { FeedForm, EntryForm } from '@/components'
import { useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import ky, { KyResponse } from 'ky'
import { useLocation, useQueryParams } from 'react-recipes'
import { creatFeed, mutateFeed, updateFeed } from '@/hooks/feed'
import { useAtom } from 'jotai'
import { authAtom } from '@/app/store'

const LayoutMain = (): JSX.Element => {
  const { getParams } = useQueryParams()
  const { code, redirect_uri } = getParams()
  const [auth] = useAtom(authAtom)
  const { data } = useVerify({ token: auth?.token })
  useEffect(() => {
    console.log('auth verifing...', data, '  code: ', code, '  redirect_uri: ', redirect_uri)
    if (data?.code === 200) {
      let url = '/'
      if (redirect_uri && redirect_uri.length > 0) {
        url = `${redirect_uri}?code=${code}`
      }
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
  onSetFormValue
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

  useEffect(() => {
    if (status === 'success' && data?.code !== 200) {
      window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
      // console.log(status, data)
    }
  }, [data, status, pathname])

  let form: JSX.Element, mutation: UseMutationResult<KyResponse, unknown, void, unknown>
  // const [mutation, setMutation] = useState<UseMutationResult<KyResponse, unknown, void, unknown>>()
  const feedMutation = mutateFeed()

  switch (formType) {
    case 1:
      form = <FeedForm feed={formValue} onFormValueChanged={onSetFormValue} />
      mutation = feedMutation
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
      <Outlet />
      <Drawer isOpen={disclosure?.isOpen} placement='right' onClose={disclosure.onClose} size='md'>
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
                // onClick={onSubmit}
                onClick={() => {
                  mutation
                    .mutateAsync(formValue)
                    .then((resp) => {
                      console.log(resp)
                      toast({ title: 'success', status: 'success' })
                      disclosure.onClose()
                    })
                    .catch((err) => toast({ title: 'failed', status: 'error', description: err.message }))
                }}
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
