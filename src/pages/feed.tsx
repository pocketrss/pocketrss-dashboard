import { useEffect, useMemo, useState } from 'react'
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Skeleton,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useArray, useLocalStorage } from 'react-recipes'
import { useAtom } from 'jotai'

import { useTheme, useFeeds } from '@/hooks'
import { FeedProps } from '@/types'
import { authAtom, drawerAtom, pageAtom } from '@/app/store'
import { DataTable, FeedForm } from '@/components'

const Feed = () => {
  // const { theme, toggleTheme } = useTheme()
  const [authStore] = useAtom(authAtom)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })
  const { data, isLoading } = useFeeds({ pagination, token: authStore.token })
  const { add, removeIndex, value: feedList, setValue: setFeedList } = useArray([])
  const [totalPage, setTotalPage] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const feedlist = data?.data?.feeds ?? []
    const totalpage = data?.page?.total ?? 0
    setFeedList(feedlist)
    setTotalPage(totalpage)
  }, [data])

  useEffect(() => setPageStore({ pageSize: pagination.pageSize }), [pagination])

  useEffect(() => (drawer.isOpen ? onOpen() : onClose()), [drawer.isOpen])

  const handleClose = () => {
    setDrawer({ ...drawer, isOpen: false })
    onClose()
  }

  const columns = useMemo<ColumnDef<FeedProps>[]>(
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
        accessorKey: 'subscription',
        cell: (info) => info.getValue(),
        header: 'Subscription',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'description',
        cell: (info) => info.getValue(),
        header: 'Description',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'created_at',
        cell: (info) =>
          DateTime.fromISO(info?.getValue() as string)
            // .setLocale('zh-CN')
            .toRelative(),
        header: 'Create Time',
        footer: (props) => props.column.id,
      },
    ],
    []
  )

  const table = useReactTable({
    debugTable: true,
    data: feedList,
    columns,
    state: { pagination },
    pageCount: totalPage,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
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
      <Flex w='full' justify='right'>
        <Button
          colorScheme='blue'
          onClick={() => {
            // onSetFormValue({})
            // disclosure.onOpen!()
            onOpen()
            setDrawer({ ...drawer, payload: { id: '' } })
          }}
        >
          Add
        </Button>
      </Flex>
      <DataTable table={table} list={feedList} />
      <Drawer isOpen={isOpen} onClose={() => handleClose()}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <FeedForm />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button colorScheme='blue' type='submit' onClick={() => console.log('form submitting...')}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}

export default Feed
