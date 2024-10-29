'use client';

import Pagination from '@/components/ui/pagination';
import { useDebounce } from '@/hooks/use-debounce';
import PageHeader from '@/shared/page-header';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Empty, Input, SearchNotFoundIcon } from 'rizzui';
import { getAllProducts } from './shared/core/_requests';
import CardProducts from './shared/partials/card-products';
import { TfiReload } from 'react-icons/tfi';

const pageHeader = {
  title: 'Kasirku',
  breadcrumb: [
    {
      name: 'Home',
    },
  ],
};

export default function KasirPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState({
    product_name: '',
  });

  const debounceSearch = useDebounce(search, 1500);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const handleSearchChange = (
    partialSearch: Partial<{
      product_name: string;
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

  const { data: productsData, totalItems } = productsQueryResponse || {};

  const productsList = productsData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        <Input
          type="search"
          clearable={true}
          placeholder="Search products..."
          onClear={() => handleSearchChange({ product_name: '' })}
          value={search.product_name}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => {
            const value = e.target.value;

            handleSearchChange({ product_name: value });
          }}
          className="mt-5 w-full md:mt-0 md:max-w-96"
        />
      </PageHeader>

      {productsList.length === 0 ? (
        <Empty
          image={<SearchNotFoundIcon />}
          text="No Result Found"
          className="h-full justify-center"
        />
      ) : (
        <CardProducts data={productsList} />
      )}

      <div className="mt-20 flex items-center justify-end">
        <Pagination
          total={totalItems}
          current={currentPage}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
