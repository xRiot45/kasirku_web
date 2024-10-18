'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllProductCategory } from './shared/core/_requests';
import ProductCategoryTables from './shared/table';
import TableLayout from './shared/table/layouts/table-layout';
import { useState } from 'react';

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

  const {
    data: productCategoryQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['product-category', currentPage],
    queryFn: () => getAllProductCategory(currentPage),
    retry: 2,
  });

  const {
    data: productCategoryData,
    totalItems,
    totalPages,
    limit,
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
        />
      </TableLayout>
    </>
  );
}
