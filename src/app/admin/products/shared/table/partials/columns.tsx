'use client';

import DeletePopover from '@/components/delete-popover';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { routes } from '@/config/routes';
import { formatToRupiah } from '@/utils/formatRupiah';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import { ProductsType } from '../../core/_models';

const columnHelper = createColumnHelper<ProductsType>();

export const productsListColumns = [
  columnHelper.display({
    id: 'product_code',
    header: 'Product Code',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.product_code}</Text>
    ),
  }),

  columnHelper.accessor('product_photo', {
    id: 'product_photo',
    size: 300,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={`${process.env.API_URL}/${row.original.product_photo}`}
        name={row.original.product_name}
        description={row.original.product_category.product_category_name}
        avatarProps={{
          name: row.original.product_name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),

  columnHelper.display({
    id: 'product_stock',
    header: 'Stock',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.product_stock ? row.original.product_stock : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'product_price',
    header: 'Price',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.product_price
          ? formatToRupiah(row.original.product_price)
          : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'product_category',
    header: 'Category',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.product_category.product_category_name
          ? row.original.product_category.product_category_name
          : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'product_variants',
    header: 'Variants',
    enableSorting: false,
    cell: ({ row }) => {
      const productVariants = row.original.product_variants.map((variant) => {
        return variant.variant;
      });

      return <Text className="text-sm">{productVariants.join(', ')}</Text>;
    },
  }),

  columnHelper.display({
    id: 'product_description',
    header: 'Description',
    enableSorting: false,
    cell: ({ row }) => {
      const productDescription = row.original.product_description;
      const words = productDescription.split(' ');
      const limitedWords = words.slice(0, 20).join(' ');

      return <Text className="text-sm">{limitedWords}</Text>;
    },
  }),

  columnHelper.display({
    id: 'product_status',
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.product_status;
      const statusClass =
        status === 'Tersedia' ? 'text-green-500' : 'text-red-500';
      return (
        <Text className={`text-sm font-semibold ${statusClass}`}>{status}</Text>
      );
    },
  }),

  columnHelper.display({
    id: 'action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Edit Product'}
          placement="top"
          color="invert"
        >
          <Link href={routes.products.editProduct(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Product'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this Product?`}
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
        />
      </Flex>
    ),
  }),
];
