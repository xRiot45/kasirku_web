'use client';

import DeletePopover from '@/components/delete-popover';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { routes } from '@/config/routes';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<any>();

export const productsListColumns = [
  columnHelper.display({
    id: 'role_name',
    size: 150,
    header: 'Role Name',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.role_name}</Text>
    ),
  }),

  columnHelper.display({
    id: 'action',
    size: 120,
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
          <Link href={routes.eCommerce.ediProduct(row.original.id)}>
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
        <Tooltip
          size="sm"
          content={'View Product'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.productDetails(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Product'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.original.id} product?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
