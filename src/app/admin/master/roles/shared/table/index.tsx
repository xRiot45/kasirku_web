'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import cn from '@/utils/class-names';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Flex, Input, Title } from 'rizzui';
import { roleListColumns } from './partials/columns';
import { IRole } from '@/services/roles/_models';
import { deleteRole } from '@/services/roles/_requests';

interface TableProps {
  dataRole: IRole[];
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
  search: { role_name: string };
  onSearchChange: (value: Partial<{ role_name: string }>) => void;
}

export default function RolesTable(props: TableProps) {
  const queryClient = useQueryClient();
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

  const { table, setData } = useTanStackTable<IRole>({
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
          handleDeleteData(row.id);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (dataRole) {
      setData(dataRole);
    }
  }, [dataRole, setData]);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully!');
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const handleDeleteData = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      <WidgetCard>
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
            onClear={() => onSearchChange({ role_name: '' })}
            value={search.role_name}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => {
              const value = e.target.value;

              onSearchChange({ role_name: value });
              table.setGlobalFilter(value);
            }}
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
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          className={cn('py-4', paginationClassName)}
        />
      </WidgetCard>
    </>
  );
}
