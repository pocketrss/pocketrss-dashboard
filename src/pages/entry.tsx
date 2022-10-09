import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  Row,
  Table as ReactTable,
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Skeleton,
  Select,
  Stack,
  Table,
  TableContainer,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useArray, useLocalStorage } from 'react-recipes'
import { useAtom } from 'jotai'

import { useTheme, useEntries } from '@/hooks'
import { EntryProps } from '@/types'
import { authAtom, drawerAtom, pageAtom } from '@/app/store'
import { DataTable, EntryForm } from '@/components'

const Entry = () => {
  const { theme } = useTheme()
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const [authStore] = useAtom(authAtom)
  console.log('token@entry page: ', authStore.token)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })

  const { data, isLoading } = useEntries({ pagination, token: authStore.token })
  const { add, clear, removeIndex, removeById, value: entryList, setValue: setEntryList } = useArray([])
  const [totalPage, setTotalPage] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => setPageStore({ pageSize: pagination.pageSize }), [pagination])

  useEffect(() => (drawer.isOpen ? onOpen() : onClose()), [drawer.isOpen])

  useEffect(() => {
    console.log('data: ', data)
    const entrylist = data?.data?.entries ?? []
    const totalpage = data?.page?.total ?? 0
    setEntryList(entrylist)
    setTotalPage(totalpage)
  }, [data])

  const handleClose = () => {
    setDrawer({ ...drawer, isOpen: false })
    onClose()
  }

  const columns = useMemo<ColumnDef<EntryProps>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: 'ID',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'title',
        cell: (info) => info.getValue(),
        header: 'Title',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'edges.feed.title',
        cell: (info) => info.getValue(),
        header: 'Feed',
        footer: (props) => props.column.id,
      },
      // {
      //   accessorKey: 'description',
      //   cell: (info) => isEmpty(info.getValue()) || isNil(info.getValue()) ? <Tag colorScheme="orange" variant="solid" size="sm">Blank</Tag> : <Tag colorScheme="green" variant="solid" size="sm">Description</Tag>,
      //   header: 'description',
      //   footer: (props) => props.column.id
      // },
      {
        accessorKey: 'created_at',
        cell: (info) => DateTime.fromISO(info.getValue() as string).toRelative(),
        header: 'Time',
        footer: (props) => props.column.id,
      },
    ],
    []
  )

  const table = useReactTable({
    data: entryList,
    columns,
    state: { pagination },
    pageCount: totalPage,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    // debugTable: true
  })

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    )
  }

  return (
    <VStack>
      <DataTable table={table} list={entryList} />
      <Drawer isOpen={isOpen} onClose={() => handleClose()}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <EntryForm />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={() => handleClose()}>
              Cancel
            </Button>
            {/* <Button colorScheme='blue' type='submit' onClick={() => console.log('form submitting...')}>
              Submit
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}

export default Entry
