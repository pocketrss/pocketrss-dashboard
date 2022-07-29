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
import { useState } from 'react'

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
  let form
  switch (formType) {
    case 1:
      form = <FeedForm feed={formValue} onFormValueChanged={onSetFormValue} />
      break
    case 2:
      form = <Text>Form type 2</Text>
      break
    default:
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
                toast({ title: formValue.title })
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
