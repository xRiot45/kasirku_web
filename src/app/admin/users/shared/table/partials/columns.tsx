'use client';

import DeletePopover from '@/components/delete-popover';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import ResetPasswordPopover from '@/components/reset-password-popover';
import AvatarCard from '@/components/ui/avatar-card';
import { routes } from '@/config/routes';
import { IUsers } from '@/services/users/_models';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<IUsers>();

export const usersListColumns = [
  columnHelper.display({
    id: 'employee_number',
    header: 'Employee Number',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.employee_number}</Text>
    ),
  }),

  columnHelper.accessor('photo', {
    id: 'photo',
    size: 300,
    header: 'Employee',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={`${process.env.API_URL}/${row.original.photo}`}
        name={row.original.full_name}
        description={row.original.email}
        avatarProps={{
          name: row.original.full_name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),

  columnHelper.display({
    id: 'birthday_date',
    header: 'Birtday Date',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.birthday_date ? row.original.birthday_date : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'place_of_birth',
    header: 'Place of Birth',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.place_of_birth ? row.original.place_of_birth : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'phone_number',
    header: 'Phone Number',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.phone_number ? row.original.phone_number : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'gender',
    header: 'Gender',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.gender ? row.original.gender : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'address',
    header: 'Address',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.address ? row.original.address : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'role',
    header: 'Role',
    enableSorting: false,
    cell: ({ row }) => {
      const roleName = row.original.role.role_name;

      const roleClass =
        roleName === 'Admin'
          ? 'bg-amber-600'
          : roleName === 'Kasir'
            ? 'bg-blue-500'
            : roleName === 'Koki'
              ? 'bg-red-500'
              : 'bg-gray-500';

      return (
        <span
          className={`rounded px-3 py-1 text-xs text-white ${roleClass} rounded-full font-semibold`}
        >
          {roleName}
        </span>
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
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <Link href={routes.users.editUser(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit User'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/* <Tooltip size="sm" content={'View User'} placement="top" color="invert">
          <Link href={routes.users.viewUser(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View User'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip> */}
        <ResetPasswordPopover
          title={`Reset Password the user`}
          description={`Are you sure you want to reset password this user?`}
          onResetPassword={() => {
            meta?.handleResetPasswordRow?.(row.original);
          }}
        />
        <DeletePopover
          title={`Delete the user`}
          description={`Are you sure you want to delete this user?`}
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
        />
      </Flex>
    ),
  }),
];
