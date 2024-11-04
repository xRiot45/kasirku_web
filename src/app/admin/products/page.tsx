'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import TableLayout from './shared/table/layouts/table-layout';
import ProductsTable from './shared/table';
import { getAllProducts } from '@/services/products/_requests';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Products',
    },
  ],
};

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    product_name: '',
    product_code: '',
  });

  const debounceSearch = useDebounce(search, 1500);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const handleSearchChange = (
    partialSearch: Partial<{
      product_name: string;
      product_code: string;
    }>
  ) => {
    setSearch((prevSearch) => ({ ...prevSearch, ...partialSearch }));
  };

  const {
    data: productsQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['products', filteredSearch, currentPage, limit],
    queryFn: () => getAllProducts(filteredSearch, currentPage, limit),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: productsData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = productsQueryResponse || {};

  const productsList = productsData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ product_name: '', product_code: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <ProductsTable
          dataProducts={productsList}
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
