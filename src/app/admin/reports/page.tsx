'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { getAllReports } from '@/services/reports/_requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import TableLayout from './shared/table/layouts/table-layout';
import ReportsTable from './shared/table';

const pageHeader = {
  title: 'Reports',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Reports',
    },
  ],
};

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    reporting_date: '',
  });

  const debounceSearch = useDebounce(search, 1500);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const handleSearchChange = (
    partialSearch: Partial<{
      reporting_date: string;
    }>
  ) => {
    setSearch((prevSearch) => ({ ...prevSearch, ...partialSearch }));
  };

  const {
    data: reportsQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['reports', filteredSearch, currentPage, limit],
    queryFn: () => getAllReports(filteredSearch, currentPage, limit),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: reportsData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = reportsQueryResponse || {};

  const reportsList = reportsData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ reporting_date: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['reports'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <ReportsTable
          dataReports={reportsList}
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
