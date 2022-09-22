import { FiExternalLink } from 'react-icons/fi'
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
  useReactTable,
} from '@tanstack/react-table'
import {
  Button,
  Code,
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
  Tag,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useArray, useLocalStorage } from 'react-recipes'
import { useAtom } from 'jotai'

import { useTheme, useEntries } from '@/hooks'
import { EntryProps } from '@/types'
import { authAtom, pageAtom } from '@/app/store'

const Favor = ({
  disclosure,
  onSetFormValue,
}: {
  disclosure: UseDisclosureProps
  onSetFormValue: Dispatch<SetStateAction<Object>>
}) => {
  const { theme } = useTheme()
  const [authStore] = useAtom(authAtom)
  const [pageStore, setPageStore] = useAtom(pageAtom)
  // const [pageSize, setPageSize] = useLocalStorage('pageSize', 10)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageStore.pageSize })

  const { data, isLoading } = useEntries({ pagination, isFavor: true, token: authStore.token })
  const { add, clear, removeIndex, removeById, value: entryList, setValue: setEntryList } = useArray([])
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const entrylist = data?.data?.entries ?? []
    const totalpage = data?.page?.total ?? 0
    setEntryList(entrylist)
    setTotalPage(totalpage)
  }, [data])

  useEffect(() => setPageStore({ pageSize: pagination.pageSize }), [pagination])

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
                onSetFormValue(entryList[row.index])
                disclosure.onOpen!()
              }
              return (
                <Tr key={row.id} data-index={row.index} onClick={() => rowClick(row)} _hover={{ cursor: 'pointer' }}>
                  {row.getVisibleCells().map((cell) => {
                    const content =
                      cell.column.id === 'title' ? (
                        // <Link href={cell.column.url} isExternal>
                        <Text noOfLines={1}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                          {/* <FiExternalLink style={{ display: 'inline-block' }} /> */}
                        </Text>
                      ) : (
                        // </Link>
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )
                    return <Td key={cell.id}>{content}</Td>
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

export default Favor
