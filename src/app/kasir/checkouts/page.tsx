'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { getAllCheckouts } from '@/services/checkouts/_requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Button } from 'rizzui';
import CheckoutsTable from './shared/table';
import TableLayout from './shared/table/layouts/table-layout';

const pageHeader = {
  title: 'Checkouts',
  breadcrumb: [
    {
      name: 'Kasir',
    },
    {
      name: 'Checkouts',
    },
  ],
};

export default function CheckoutsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    order_status: '',
  });

  const debounceSearch = useDebounce(search.order_status, 1000);

  const {
    data: checkoutsQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['checkouts', currentPage, limit, debounceSearch],
    queryFn: () => getAllCheckouts(currentPage, limit, debounceSearch),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: checkoutsData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = checkoutsQueryResponse || {};

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ order_status: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['checkouts'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <Button className="mb-6 h-11 w-64 gap-3" onClick={() => router.back()}>
          <FaAnglesLeft />
          Back to previous page
        </Button>
        <CheckoutsTable
          dataCheckouts={checkoutsData || []}
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
