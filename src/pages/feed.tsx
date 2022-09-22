import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  Row,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from '@tanstack/react-table'
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useArray, useLocalStorage } from 'react-recipes'
import { useAtom } from 'jotai'

import { useTheme, useFeeds } from '@/hooks'
import { FeedProps } from '@/types'
import { authAtom, pageAtom } from '@/app/store'

const Feed = ({
  disclosure,
  onSetFormValue,
}: {
  disclosure: UseDisclosureProps
  onSetFormValue: Dispatch<SetStateAction<Object>>
}) => {
  // const { theme, toggleTheme } = useTheme()
  const [authStore] = useAtom(authAtom)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  // const [pageSize, setPageSize] = useLocalStorage('pageSize', 0)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })
  const { data, isLoading } = useFeeds({ pagination, token: authStore.token })
  const { add, removeIndex, value: feedList, setValue: setFeedList } = useArray([])
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const feedlist = data?.data?.feeds ?? []
    const totalpage = data?.page?.total ?? 0
    setFeedList(feedlist)
    setTotalPage(totalpage)
  }, [data])

  useEffect(() => setPageStore({ pageSize: pagination.pageSize }), [pagination])

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
            onSetFormValue({})
            disclosure.onOpen!()
          }}
        >
          Add
        </Button>
      </Flex>
      <TableContainer bgColor='white' w='full'>
        <Table variant='simple'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      )}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              const rowClick = (row: Row<FeedProps>) => {
                if (!row) return
                onSetFormValue(feedList[row.index])
                disclosure.onOpen!()
              }
              return (
                <Tr key={row.id} data-index={row.index} onClick={() => rowClick(row)} _hover={{ cursor: 'pointer' }}>
                  {row.getVisibleCells().map((cell) => {
                    return <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <HStack m={1}>
          <Text>Page</Text>
          <Button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
            {'<<'}
          </Button>
          <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            {'<'}
          </Button>
          <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            {'>'}
          </Button>
          <Button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            {'>>'}
          </Button>
          <InputGroup>
            {/* <InputLeftElement h="full">
              <Text p={1} fontSize={11} bgColor="gray.100">Total: {table.getPageCount()}</Text>
            </InputLeftElement> */}
            <InputLeftAddon children={`Total ${table.getPageCount()}`} />
            <Input
              type='number'
              w={50}
              value={table.getState().pagination.pageIndex + 1}
              bgColor='white'
              textAlign='end'
              onChange={(evt) => {
                const page = evt.target.value ? Number(evt.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
            />
          </InputGroup>
          <Text>Show</Text>
          <Select
            w={150}
            value={table.getState().pagination.pageSize}
            onChange={(evt) => table.setPageSize(Number(evt.target.value))}
          >
            {['10', '20', '50', '100'].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </TableContainer>
    </VStack>
  )
}

export default Feed
