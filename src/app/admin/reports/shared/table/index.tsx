'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import { IReports } from '@/services/reports/_model';
import cn from '@/utils/class-names';
import { useQueryClient } from '@tanstack/react-query';
import { Flex, Title } from 'rizzui';
import Filters from './partials/filters';
import { reportsListColumns } from './partials/columns';

type SearchProps = {
  reporting_date: string;
};

interface TableProps {
  dataReports: IReports[];
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
  onPageChange: (page: number) => void;
  onLimitChange: (value: number) => void;
  search?: SearchProps;
  onSearchChange?: (value: Partial<SearchProps>) => void;
}

export default function ReportsTable(props: TableProps) {
  const queryClient = useQueryClient();
  const {
    dataReports,
    pageSize,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    onPageChange,
    onLimitChange,
    paginationClassName,
    search,
    onSearchChange,
    classNames = {
      container: 'border border-muted rounded-md',
      rowClassName: 'last:border-0',
    },
  } = props;

  const { table, setData } = useTanStackTable<IReports>({
    tableData: dataReports,
    columnConfig: reportsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: currentPage ? currentPage - 1 : 0,
          pageSize: pageSize,
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <WidgetCard>
        <Flex justify="between" className="mb-6">
          <Title className="text-lg font-semibold">Data Reports</Title>
          <Filters
            table={table}
            search={
              search || {
                reporting_date: '',
              }
            }
            onSearchChange={onSearchChange ?? (() => {})}
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
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          className={cn('py-4', paginationClassName)}
        />
      </WidgetCard>
    </>
  );
}
