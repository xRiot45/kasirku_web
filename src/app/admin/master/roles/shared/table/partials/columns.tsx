'use client';

import DeletePopover from '@/components/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import { routes } from '@/config/routes';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import { RoleType } from '../../core/_models';

const columnHelper = createColumnHelper<RoleType>();

export const roleListColumns = [
  columnHelper.display({
    id: 'role_name',
    header: 'Role Name',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.role_name}</Text>
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
        <Tooltip size="sm" content={'Edit Role'} placement="top" color="invert">
          <Link href={routes.roles.editRole(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Role'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the role`}
          description={`Are you sure you want to delete this role?`}
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
        />
      </Flex>
    ),
  }),
];
