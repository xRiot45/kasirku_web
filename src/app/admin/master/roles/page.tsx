'use client';

import TableLayout from '@/app/admin/master/roles/shared/table/layouts/table-layout';
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from './shared/core/_requests';
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
  const {
    data: roleQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });

  const {
    data: rolesData,
    totalItems,
    totalPages,
    currentPage,
    limit,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = roleQueryResponse || {};

  const rolesList = rolesData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <RolesTable
          dataRole={rolesList}
          pageSize={limit}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </TableLayout>
    </>
  );
}
