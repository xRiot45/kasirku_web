'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import { useMutationHooks } from '@/hooks/use-mutation';
import { ICheckout } from '@/services/checkouts/_models';
import {
  cancelledCheckout,
  completedCheckout,
  confirmedCheckout,
  deleteCheckout,
  processedCheckout,
} from '@/services/checkouts/_requests';
import cn from '@/utils/class-names';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { checkoutListColumns } from './partials/columns';

interface TableProps {
  dataCheckouts: ICheckout[];
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
  search: { order_status: string };
  onSearchChange: (value: Partial<{ order_status: string }>) => void;
}

export default function CheckoutsTable(props: TableProps) {
  const queryClient = useQueryClient();
  const {
    dataCheckouts,
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

  const { table, setData } = useTanStackTable<ICheckout>({
    tableData: dataCheckouts,
    columnConfig: checkoutListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: currentPage ? currentPage - 1 : 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleConfirmedRow(row) {
          handleConfirmCheckout(row.id);
        },

        handleProcessedRow(row) {
          handleProcessCheckout(row.id);
        },

        handleCompletedRow(row) {
          handleCompleteCheckout(row.id);
        },

        handleCancelledRow(row) {
          handleCancelCheckout(row.id);
        },

        handleDeleteRow(row) {
          handleDeleteCheckout(row.id);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (dataCheckouts) {
      setData(dataCheckouts);
    }
  }, [dataCheckouts, setData]);

  const mutationConfirmCheckout = useMutationHooks(
    confirmedCheckout,
    'Confirmed checkout successfully!',
    'An error occurred while confirming checkout, please try again!'
  );

  const mutationProcessCheckout = useMutationHooks(
    processedCheckout,
    'Processed checkout successfully!',
    'An error occurred while processing checkout, please try again!'
  );

  const mutationCompleteCheckout = useMutationHooks(
    completedCheckout,
    'Completed checkout successfully!',
    'An error occurred while completing checkout, please try again!'
  );

  const mutationCancelCheckout = useMutationHooks(
    cancelledCheckout,
    'Cancelled checkout successfully!',
    'An error occurred while cancelling checkout, please try again!'
  );

  const mutationDeleteCheckout = useMutationHooks(
    deleteCheckout,
    'Deleted checkout successfully!',
    'An error occurred while cancelling checkout, please try again!'
  );

  const handleConfirmCheckout = (id: string) => {
    mutationConfirmCheckout.mutate(id);
  };

  const handleProcessCheckout = (id: string) => {
    mutationProcessCheckout.mutate(id);
  };

  const handleCompleteCheckout = (id: string) => {
    mutationCompleteCheckout.mutate(id);
  };

  const handleCancelCheckout = (id: string) => {
    mutationCancelCheckout.mutate(id);
  };

  const handleDeleteCheckout = (id: string) => {
    mutationDeleteCheckout.mutate(id);
  };

  return (
    <>
      <WidgetCard>
        {/* <Filters table={table} /> */}

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
