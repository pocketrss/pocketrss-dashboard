import { EntryProps } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import {
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
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
  Skeleton,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useList } from 'react-use'
import { useAtom } from 'jotai'

import { useTheme, useEntries } from '@/hooks'
import { EntryForm, DataTable } from '@/components'
import { authAtom, drawerAtom, pageAtom } from '@/app/store'

const Favor = () => {
  const { theme } = useTheme()
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const [authStore] = useAtom(authAtom)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })

  const { data, isLoading } = useEntries({ pagination, isFavor: true, token: authStore.token })
  const [entryList, { set: setEntryList }] = useList<EntryProps>()
  const [totalPage, setTotalPage] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const entrylist = (data?.data?.entries ?? []) as Array<EntryProps>
    const totalpage = data?.page?.total ?? 0
    setEntryList(entrylist)
    setTotalPage(totalpage)
  }, [data])

  useEffect(() => setPageStore({ pageSize: pagination.pageSize }), [pagination])

  useEffect(() => (drawer.isOpen ? onOpen() : onClose()), [drawer.isOpen])

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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}

export default Favor
