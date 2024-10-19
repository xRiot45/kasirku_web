'use client';

import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { TableClassNameProps } from '@/components/table/table-types';
import cn from '@/utils/class-names';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Flex, Input, Title } from 'rizzui';
import { ProductCategoryResponse } from '../core/_models';
import { deleteProductCategory } from '../core/_requests';
import { productCategoryListColumns } from './partials/columns';

interface TableProps {
  dataProductCategory: ProductCategoryResponse[];
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage?: number | undefined;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  search: { product_category_name: string };
  onSearchChange: (value: Partial<{ product_category_name: string }>) => void;
}

export default function ProductCategoryTables(props: TableProps) {
  const queryClient = useQueryClient();
  const {
    dataProductCategory,
    pageSize,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    classNames = {
      container: 'border border-muted rounded-md',
      rowClassName: 'last:border-0',
    },
    paginationClassName,
    onPageChange,
    onLimitChange,
    search,
    onSearchChange,
  } = props;

  const { table, setData } = useTanStackTable<any>({
    tableData: dataProductCategory || [],
    columnConfig: productCategoryListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: currentPage ? currentPage - 1 : 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          handleDeleteData(row.id);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (dataProductCategory) {
      setData(dataProductCategory);
    }
  }, [dataProductCategory, setData]);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteProductCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-category'] });
      toast.success('Product Category deleted successfully!');
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const handleDeleteData = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      <WidgetCard>
        {/* <Filters table={table} /> */}
        <Flex
          direction="col"
          justify="between"
          className="mb-4 xs:flex-row xs:items-center"
        >
          <Title className="text-lg font-semibold">Data Product Category</Title>
          <Input
            type="search"
            clearable={true}
            placeholder="Search product category..."
            onClear={() => onSearchChange({ product_category_name: '' })}
            value={search.product_category_name}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => {
              const value = e.target.value;

              onSearchChange({ product_category_name: value });
              table.setGlobalFilter(value);
            }}
            className="w-full xs:max-w-60"
          />
        </Flex>
        <Table table={table} variant="modern" classNames={classNames} />
        <TablePagination
          table={table}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          className={cn('py-4', paginationClassName)}
        />
      </WidgetCard>
    </>
  );
}
