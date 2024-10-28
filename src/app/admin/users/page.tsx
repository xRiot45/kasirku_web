'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllUsers } from './shared/core/_requests';
import UsersTable from './shared/table';
import TableLayout from './shared/table/layouts/table-layout';

const pageHeader = {
  title: 'Users',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Users',
    },
  ],
};

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    full_name: '',
    email: '',
    employee_number: '',
  });

  const debounceSearch = useDebounce(search, 1500);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const handleSearchChange = (
    partialSearch: Partial<{
      full_name: string;
      email: string;
      employee_number: string;
    }>
  ) => {
    setSearch((prevSearch) => ({ ...prevSearch, ...partialSearch }));
  };

  const {
    data: usersQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['users', filteredSearch, currentPage, limit],
    queryFn: () => getAllUsers(filteredSearch, currentPage, limit),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: usersData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = usersQueryResponse || {};

  const usersList = usersData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ full_name: '', email: '', employee_number: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <UsersTable
          dataUsers={usersList}
          pageSize={limit}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          onPageChange={setCurrentPage}
          previousPage={previousPage}
          search={search}
          onSearchChange={handleSearchChange}
          onLimitChange={setLimit}
        />
      </TableLayout>
    </>
  );
}
