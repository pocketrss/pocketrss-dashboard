import { useTheme, useEntries } from '@/hooks'

import { EntryProps } from '@/types'
import { FiExternalLink } from 'react-icons/fi';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import {
  Row,
  Table as ReactTable,
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  useReactTable
} from '@tanstack/react-table'
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Link,
  Skeleton,
  Select,
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
  Tag
} from '@chakra-ui/react'
import { DateTime } from 'luxon'

const Entry = ({
  disclosure,
  onSetFormValue
}: {
  disclosure: UseDisclosureProps
  onSetFormValue: Dispatch<SetStateAction<Object>>
}) => {
  const { theme } = useTheme()
  const { data, isLoading } = useEntries({})
  const defaultData = useMemo<Array<EntryProps>>(() => [], [])

  const columns = useMemo<ColumnDef<EntryProps>[]>(
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
      // {
      //   accessorKey: 'content',
      //   cell: (info) => isEmpty(info.getValue()) || isNil(info.getValue()) ? <Tag colorScheme="orange" variant="solid" size="sm" fontSize="xs">Blank</Tag> : <Tag colorScheme="green" variant="solid" size="sm">Content</Tag>,
      //   header: 'content',
      //   footer: (props) => props.column.id
      // },
      // {
      //   accessorKey: 'description',
      //   cell: (info) => isEmpty(info.getValue()) || isNil(info.getValue()) ? <Tag colorScheme="orange" variant="solid" size="sm">Blank</Tag> : <Tag colorScheme="green" variant="solid" size="sm">Description</Tag>,
      //   header: 'description',
      //   footer: (props) => props.column.id
      // },
      {
        accessorKey: 'published_at',
        cell: (info) => DateTime.fromISO(info?.getValue()).toRelative(),
        header: 'Published Time',
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
      {/* <Flex w='full' justify='right'>
        <Button
          colorScheme='blue'
          onClick={() => {
            onSetFormValue({})
            disclosure.onOpen()
          }}
        >
          Add
        </Button>
      </Flex> */}
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
              const rowClick = (row: Row<EntryProps>) => {
                if (!row) return
                const feed = data[row.index]
                onSetFormValue(feed)
                disclosure.onOpen()
              }
              return (
                <Tr key={row.id} data-index={row.index} onClick={() => rowClick(row)} _hover={{ cursor: 'pointer' }}>
                  {row.getVisibleCells().map((cell) => {
                    const props: Object = cell.column.id === 'title' ? { noOfLines: 1, maxW: 'lg' } : {}
                    const content = cell.column.id === 'title' ? (<Link href={cell.column.url} isExternal>{flexRender(cell.column.columnDef.cell, cell.getContext())} <FiExternalLink mx="2px" display='inline' /></Link>) : flexRender(cell.column.columnDef.cell, cell.getContext())
                    return <Td key={cell.id} {...props}>{content}</Td>
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <HStack>
          <Button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>{'<<'}</Button>
          <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>{'<'}</Button>
          <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>{'>'}</Button>
          <Button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>{'>>'}</Button>
          <Text>Page</Text>
          <InputGroup>
            {/* <InputLeftElement h="full">
              <Text p={1} fontSize={11} bgColor="gray.100">Total: {table.getPageCount()}</Text>
            </InputLeftElement> */}
            <InputLeftAddon children={`Total ${table.getPageCount()}`} />
            <Input type="number" w={50} value={table.getState().pagination.pageIndex + 1} bgColor="white" textAlign="end" onChange={(evt) => {
              const page = evt.target.value ? Number(evt.target.value) - 1 : 0
              table.setPageIndex(page)
            }} />
          </InputGroup>
          <Select w={130} value={table.getState().pagination.pageSize} onChange={(evt) => table.setPageSize(Number(evt.target.value))}>
            {['10', '20', '50', '100'].map((pageSize) => <option key={pageSize} value={pageSize}>Show {pageSize}</option>)}
          </Select>
        </HStack>
      </TableContainer>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </VStack>
  )
}

export default Entry
