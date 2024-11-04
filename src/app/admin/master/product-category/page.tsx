'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ProductCategoryTables from './shared/table';
import TableLayout from './shared/table/layouts/table-layout';
import { getAllProductCategory } from '@/services/product-category/_requests';

const pageHeader = {
  title: 'Product Category',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Master Data',
    },
    {
      name: 'Product Category',
    },
  ],
};

export default function ProductCategoryPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    product_category_name: '',
  });

  const debourceSearch = useDebounce(search.product_category_name, 1000);

  const {
    data: productCategoryQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['product-category', currentPage, limit, debourceSearch],
    queryFn: () => getAllProductCategory(currentPage, limit, debourceSearch),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: productCategoryData,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = productCategoryQueryResponse || {};

  const productCategoryList = productCategoryData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleRefresh = () => {
    setSearch({ product_category_name: '' });
    setCurrentPage(1);
    setLimit(10);

    queryClient.invalidateQueries({ queryKey: ['product-category'] });
  };

  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        refresh={handleRefresh}
      >
        <ProductCategoryTables
          dataProductCategory={productCategoryList}
          pageSize={limit}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          onPageChange={setCurrentPage}
          onLimitChange={setLimit}
          search={search}
          onSearchChange={(value) =>
            setSearch((prev) => ({ ...prev, ...value }))
          }
        />
      </TableLayout>
    </>
  );
}
