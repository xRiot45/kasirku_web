'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from './core/_requests';

import RolesTable from './partials/table';

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
      <RolesTable dataRole={roleList} />
    </>
  );
}
