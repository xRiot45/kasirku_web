'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    full_name: '',
    email: '',
    role_name: '',
    employee_number: '',
    gender: '',
  });

  const debounceSearch = useDebounce(search, 1000);

  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

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

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
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
          // search={search}
          // onSearchChange={(value) =>
          //   setSearch((prev) => ({ ...prev, ...value }))
          // }
          onLimitChange={setLimit}
        />
      </TableLayout>
    </>
  );
}
