import { drawerAtom } from '@/app/store'
import { Dict, DrawerPayloadProps, EntryProps } from '@/types'
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
  Text,
} from '@chakra-ui/react'
import { flexRender, Row, Table as ReactTable } from '@tanstack/react-table'
import { useAtom } from 'jotai'

const DataTable = ({ table, list }: { table: ReactTable<any>; list: Array<DrawerPayloadProps> }) => {
  const [drawer, setDrawer] = useAtom(drawerAtom)

  return (
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
              setDrawer({ ...drawer, isOpen: true, payload: list[row.index] })
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
            w={90}
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
  )
}

export default DataTable
