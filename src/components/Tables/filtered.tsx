import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Erase } from './erase';
import { Updater } from './updater';
import { FilterProps, Recruitment } from './types';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Info,
  Settings,
  Trash,
} from 'lucide-react';

import Link from 'next/link';

function formatDate(isoString: string) {
  const result_format = format(isoString, "dd/MM/yy '-' HH:mm", {
    locale: ptBR,
  });
  const result = result_format.split('-');
  return result;
}

export function Filtered({ toast, data }: FilterProps) {
  const columns: ColumnDef<Recruitment>[] = [
    {
      accessorKey: 'enterprise',
      header: 'Empresa',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('enterprise')}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Criado em
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge className="capitalize w-[110px] flex flex-col" variant="outline">
          {formatDate(String(row.getValue('createdAt')))[0]}
          <span>{formatDate(String(row.getValue('createdAt')))[1]}</span>
        </Badge>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Atualizado em
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge className="capitalize w-[110px] flex flex-col" variant="outline">
          {formatDate(String(row.getValue('updatedAt')))[0]}
          <span>{formatDate(String(row.getValue('updatedAt')))[1]}</span>
        </Badge>
      ),
    },
    {
      accessorKey: 'situation',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Situação
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge
          className="capitalize w-[110px] h-[38px] flex items-center justify-center"
          variant="outline"
        >
          <span className="text-center">{row.getValue('situation')}</span>
        </Badge>
      ),
    },
    {
      id: 'actions',
      enableHiding: true,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2"
                key={'copiar'}
                onClick={() => {
                  toast({
                    title: 'ID foi copiado com sucesso!',
                  });
                  navigator.clipboard.writeText(payment.id);
                }}
              >
                <Copy size={14} /> Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem key={'detalhes'}>
                <Link
                  href={`/auth/detail/${payment.id}`}
                  className="flex gap-2 items-center"
                >
                  <Info size={14} /> Ver detalhes
                </Link>
              </DropdownMenuItem>
              <Updater id={payment.id}>
                <Settings size={14} /> Editar
              </Updater>
              <Erase id={payment.id}>
                <Trash size={14} /> Deletar
              </Erase>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="max-w-[96vw] sm:max-w-[99vw] sm:w-full animate__animated animate__lightSpeedInRight">
      <div className="flex gap-2 items-center py-4">
        <Input
          placeholder="Filtrar nome de empressas..."
          value={
            (table.getColumn('enterprise')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('enterprise')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selecionado'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} items.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
