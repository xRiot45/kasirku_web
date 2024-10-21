'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllProducts } from './shared/core/_requests';
import TableLayout from './shared/table/layouts/table-layout';
import ProductsTable from './shared/table';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    product_name: '',
    product_code: '',
    product_status: '',
    product_category_name: '',
  });

  const debounceSearch = useDebounce(search, 1500);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const handleSearchChange = (
    partialSearch: Partial<{
      product_name: string;
      product_code: string;
      product_status: string;
      product_category_name: string;
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

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
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
