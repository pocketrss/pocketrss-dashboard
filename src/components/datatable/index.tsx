import { FeedProps } from '@/types'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import {
  Column,
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
import { useMemo } from 'react'

export function DataTable({
  columns: userColumns,
  data
}: {
  data: Array<FeedProps>
  columns: Array<ColumnDef<FeedProps>>
}) {
  const columns = useMemo<ColumnDef<FeedProps>[]>(
    () => [
      {
        header: 'ID',
        columns: [
          {
            accessorKey: 'id',
            cell: (info) => info.getValue()
          }
        ]
      },
      {
        header: 'Title',
        columns: [
          {
            accessorKey: 'title',
            cell: (info) => info.getValue()
          }
        ]
      }
    ],
    []
  )
  const table = useReactTable({
    data,
    userColumns,
    getTableProps,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  })

  return <Table {...getTableProps()}></Table>
}
