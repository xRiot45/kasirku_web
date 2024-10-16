'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import cn from '@/utils/class-names';
import { FaPlus } from 'react-icons/fa';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { Button, Flex, Input, Title } from 'rizzui';
import { productsListColumns } from './partials/columns';
import Link from 'next/link';

export default function RolesTable({
  dataRole,
  pageSize = 5,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  dataRole: any[];
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const { table, setData } = useTanStackTable<any>({
    tableData: dataRole,
    columnConfig: productsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <WidgetCard>
        {/* <Filters table={table} /> */}
        <Flex
          direction="col"
          justify="between"
          className="mb-4 xs:flex-row xs:items-center"
        >
          <Title className="text-lg font-semibold">Data Role</Title>
          <Input
            type="search"
            clearable={true}
            placeholder="Search role..."
            onClear={() => table.setGlobalFilter('')}
            value={table.getState().globalFilter ?? ''}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full xs:max-w-60"
          />
        </Flex>
        <Table table={table} variant="modern" classNames={classNames} />
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
        />
      </WidgetCard>
    </>
  );
}
