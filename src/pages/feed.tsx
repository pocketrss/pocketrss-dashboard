import { useTheme } from '@/hooks'
import { useFeeds } from '@/hooks/feed'

import { FeedProps } from '@/types'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
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
  flexRender
} from '@tanstack/react-table'
import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  UseDisclosureProps
} from '@chakra-ui/react'
import { DateTime } from 'luxon'

const Feed = ({
  disclosure,
  onSetFormValue
}: {
  disclosure: UseDisclosureProps
  onSetFormValue: Dispatch<SetStateAction<Object>>
}) => {
  const { theme, toggleTheme } = useTheme()
  const { data, isLoading } = useFeeds({})
  const defaultData = useMemo<Array<FeedProps>>(() => [], [])

  const columns = useMemo<ColumnDef<FeedProps>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: 'ID',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'title',
        cell: (info) => info.getValue(),
        header: 'Title',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'subscription',
        cell: (info) => info.getValue(),
        header: 'Subscription',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'description',
        cell: (info) => info.getValue(),
        header: 'Description',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'created_at',
        cell: (info) => DateTime.fromISO(info?.getValue()).setLocale('zh-CN').toLocaleString(),
        header: 'Create Time',
        footer: (props) => props.column.id
      }
    ],
    []
  )
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
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
      <Flex w='100%' justify='right'>
        <Button
          colorScheme='blue'
          onClick={() => {
            onSetFormValue({})
            disclosure.onOpen()
          }}
        >
          Add
        </Button>
      </Flex>
      <TableContainer bgColor='white'>
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
                const feed = data[row.index]
                onSetFormValue(feed)
                disclosure.onOpen()
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
      </TableContainer>
    </VStack>
  )
}

export default Feed
