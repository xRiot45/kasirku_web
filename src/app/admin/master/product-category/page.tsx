'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllProductCategory } from './shared/core/_requests';
import ProductCategoryTables from './shared/table';
import TableLayout from './shared/table/layouts/table-layout';

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
    queryKey: ['product-category', debourceSearch, currentPage, limit],
    queryFn: () => getAllProductCategory(debourceSearch, currentPage, limit),
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

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
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
