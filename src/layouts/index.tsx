import { SidebarWithHeader } from '@/components/sidebar'

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
  useToast
} from '@chakra-ui/react'
import { LinkItemProps } from '@/types'
import { FeedForm } from '@/components'
import { useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import ky, { KyResponse } from 'ky'
import { creatFeed, mutateFeed, updateFeed } from '@/hooks/feed'

const LayoutMain = (): JSX.Element => {
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
  let form: JSX.Element, mutation: UseMutationResult<KyResponse, unknown, void, unknown>
  // const [mutation, setMutation] = useState<UseMutationResult<KyResponse, unknown, void, unknown>>()
  const feedMutation = mutateFeed()

  switch (formType) {
    case 1:
      form = <FeedForm feed={formValue} onFormValueChanged={onSetFormValue} />
      mutation = feedMutation
      break
    case 2:
      form = <Text>Form type 2</Text>
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
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>{form}</DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={disclosure.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              type='submit'
              // onClick={onSubmit}
              onClick={() => {
                mutation.mutateAsync(formValue)
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarWithHeader>
  )
}

export default LayoutMain
