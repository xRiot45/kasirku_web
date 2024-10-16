'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import cn from '@/utils/class-names';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Flex, Input, Title } from 'rizzui';
import { RoleRespone } from '../../core/_models';
import { roleListColumns } from './partials/columns';

interface TableProps {
  dataRole: RoleRespone[];
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage?: number | undefined;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}

export default function RolesTable(props: TableProps) {
  const {
    dataRole,
    pageSize,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    classNames = {
      container: 'border border-muted rounded-md',
      rowClassName: 'last:border-0',
    },
    paginationClassName,
  } = props;

  const { table, setData } = useTanStackTable<any>({
    tableData: dataRole,
    columnConfig: roleListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: currentPage ? currentPage - 1 : 0,
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
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          className={cn('py-4', paginationClassName)}
        />
      </WidgetCard>
    </>
  );
}
