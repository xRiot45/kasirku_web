import { TableClassNameProps } from '@/components/table/table-types';
import { UsersResponse, UsersType } from '../core/_models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { deleteUser, resetPassword } from '../core/_requests';
import WidgetCard from '@/components/cards/widget-card';
import { Flex, Title } from 'rizzui';
import Table from '@/components/table';
import TablePagination from '@/components/table/pagination';
import cn from '@/utils/class-names';
import { usersListColumns } from './partials/columns';
import Filters from './partials/filters';

type SearchProps = {
  employee_number: string;
  full_name: string;
  email: string;
};

interface TableProps {
  dataUsers: UsersResponse[];
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

export default function UsersTable(props: TableProps) {
  const queryClient = useQueryClient();
  const {
    dataUsers,
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

  const { table, setData } = useTanStackTable<UsersType>({
    tableData: dataUsers,
    columnConfig: usersListColumns,
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

        handleResetPasswordRow: (row) => {
          handleResetPassword(row.id);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (dataUsers) {
      setData(dataUsers);
    }
  }, [dataUsers, setData]);

  const mutationDeleteData = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const mutationResetPassword = useMutation({
    mutationFn: (id: string) => resetPassword(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Reset password successfully!');
    },

    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const handleDeleteData = (id: string) => {
    mutationDeleteData.mutate(id);
  };

  const handleResetPassword = (id: string) => {
    mutationResetPassword.mutate(id);
  };

  return (
    <>
      <WidgetCard>
        <Flex justify="between" className="mb-6">
          <Title className="text-lg font-semibold">Data Users</Title>
          <Filters
            table={table}
            search={search || { employee_number: '', full_name: '', email: '' }}
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
