'use client';

import TableLayout from '@/app/admin/master/roles/shared/table/layouts/table-layout';
import { useDebounce } from '@/hooks/use-debounce';
import { getAllRoles } from '@/services/roles/_requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import RolesTable from './shared/table';

const pageHeader = {
  title: 'Roles',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Master Data',
    },
    {
      name: 'Roles',
    },
  ],
};

export default function RolesPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    role_name: '',
  });

  const debounceSearch = useDebounce(search.role_name, 1000);

  const {
    data: roleQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['roles', currentPage, limit, debounceSearch],
    queryFn: () => getAllRoles(currentPage, limit, debounceSearch),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: rolesData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = roleQueryResponse || {};

  const rolesList = rolesData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ role_name: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['roles'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <RolesTable
          dataRole={rolesList}
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
          onSearchChange={(value) =>
            setSearch((prev) => ({ ...prev, ...value }))
          }
          onLimitChange={setLimit}
        />
      </TableLayout>
    </>
  );
}
