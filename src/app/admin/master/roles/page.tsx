'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from './core/_requests';
import TableLayout from '@/app/admin/master/roles/shared/table/layouts/table-layout';
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
  const {
    data: roleList = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <RolesTable dataRole={roleList} />
      </TableLayout>
    </>
  );
}
