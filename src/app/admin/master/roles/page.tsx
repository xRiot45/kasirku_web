'use client';

import TableLayout from '@/app/admin/master/roles/shared/table/layouts/table-layout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteRole, getAllRoles } from './shared/core/_requests';
import RolesTable from './shared/table';

const pageHeader = {
  title: 'Roles',
  breadcrumb: [
    {
      href: '#',
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

  const mutation = useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully!');
    },
    onError: () => {
      toast.error('An error occurred while delete data, please try again!');
    },
  });

  const handleDeleteData = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <RolesTable
          onDeleteData={handleDeleteData}
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
