'use client';

import DeletePopover from '@/components/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import { routes } from '@/config/routes';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import { ProductCategoryType } from '../../core/_models';

const columnHelper = createColumnHelper<ProductCategoryType>();

export const productCategoryListColumns = [
  columnHelper.display({
    id: 'no',
    size: 0,
    header: 'No',
    cell: ({ row }) => <Text className="text-sm">{row.index + 1}</Text>,
  }),

  columnHelper.display({
    id: 'product_category_name',
    header: 'Product Category Name',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.product_category_name}</Text>
    ),
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
          content={'Edit Product Category'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.productCategory.editProductCategory(row.original.id)}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Product Category'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the Product Category`}
          description={`Are you sure you want to delete this Product Category?`}
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
        />
      </Flex>
    ),
  }),
];
