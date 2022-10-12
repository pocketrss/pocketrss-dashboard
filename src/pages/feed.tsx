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
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Skeleton,
  Stack,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useList } from 'react-use'
import { useAtom } from 'jotai'

import { mutateFeed, useFeeds, useTheme } from '@/hooks'
import { DrawerPayloadProps, FeedProps } from '@/types'
import { authAtom, drawerAtom, pageAtom } from '@/app/store'
import { DataTable, FeedForm } from '@/components'
import { last, sortBy } from 'rambda'

const Feed = () => {
  // const { theme, toggleTheme } = useTheme()
  const [authStore] = useAtom(authAtom)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })
  const { data, isLoading } = useFeeds({ pagination, token: authStore.token })
  const [feedList, { set: setFeedList, push: pushFeedList, update: updateFeedList, removeAt: removeFeedListAt }] =
    useList<FeedProps>()
  const [totalPage, setTotalPage] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const mutation = mutateFeed()

  useEffect(() => {
    const feedlist = (data?.data?.feeds ?? []) as Array<FeedProps>
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
      <Flex w='full' justify='flex-end'>
        <Button
          colorScheme='blue'
          onClick={() => {
            onOpen()
            setDrawer({ ...drawer, payload: { id: 0 } })
          }}
        >
          Add
        </Button>
      </Flex>
      <DataTable table={table} list={feedList} />
      <Drawer size='md' isOpen={isOpen} onClose={() => handleClose()}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Form for feed</DrawerHeader>
          <DrawerBody lineHeight={9}>
            <FeedForm />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              type='submit'
              onClick={() => {
                mutation
                  .mutateAsync({ data: drawer.payload, token: authStore?.token ?? '' })
                  .then(() => {
                    const sortFn = (x: DrawerPayloadProps) => x.id
                    const sortedFeedList = sortBy(sortFn, feedList)
                    const lastId = last(sortedFeedList)?.id ?? 0
                    const tempFeed = { ...drawer.payload, id: lastId + 1 }
                    drawer.payload.id
                      ? updateFeedList((a, b) => a.id === b.id, drawer.payload as FeedProps)
                      : pushFeedList(tempFeed as FeedProps)
                    toast({ title: 'Success', description: 'Feeds created', status: 'success' })
                    handleClose()
                  })
                  .catch((err) => {
                    console.error(err)
                    toast({ title: 'failed', status: 'error', description: `${err}` })
                  })
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}

export default Feed
