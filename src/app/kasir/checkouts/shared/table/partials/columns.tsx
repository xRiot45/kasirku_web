'use client';

import DeletePopover from '@/components/delete-popover';
import { ICheckout } from '@/services/checkouts/_models';
import { IOrders } from '@/services/orders/_models';
import { formatToRupiah } from '@/utils/formatRupiah';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { CiSliderHorizontal } from 'react-icons/ci';
import { GiConfirmed } from 'react-icons/gi';
import { IoMdDoneAll } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';
import { TfiReload } from 'react-icons/tfi';
import { ActionIcon, Dropdown, Flex, Text, Title, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<ICheckout>();

const orderStatusStyles: { [key: string]: string } = {
  'Order Dikonfirmasi': 'bg-blue-500 text-white',
  'Order Sedang Diproses': 'bg-yellow-500 text-white',
  'Order Selesai': 'bg-green-500 text-white',
  'Order Dibatalkan': 'bg-red-500 text-white',
};

export const checkoutListColumns = [
  columnHelper.display({
    id: 'orders',
    header: 'Products',
    enableSorting: false,
    size: 300,
    cell: ({ row }) => {
      const checkoutData = row.original;
      return (
        <div>
          {checkoutData.orders.map((order: IOrders) => (
            <div key={order.id} className="mb-2 flex items-center">
              <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
                <Image
                  alt={order.product.product_name}
                  src={`${process.env.API_URL}/${order.product.product_photo}`}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover"
                />
              </div>
              <div className="ms-4">
                <Title as="h6" className="!text-sm font-medium">
                  {order.product.product_name}
                </Title>
                <Text className="text-xs text-gray-500">
                  Variant: {order.selected_variant} | Quantity: {order.quantity}
                </Text>
              </div>
            </div>
          ))}
        </div>
      );
    },
  }),

  columnHelper.display({
    id: 'total_order_price',
    header: 'Total Order Price',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.total_order_price
          ? formatToRupiah(row.original.total_order_price)
          : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'checkout_date',
    header: 'Checkout Date',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.checkout_date
          ? new Date(row.original.checkout_date).toLocaleString()
          : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'payment_method',
    header: 'Payment Method',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.payment_method ? row.original.payment_method : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'seat_number',
    header: 'Seat Number',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.seat_number ? row.original.seat_number : '-'}
      </Text>
    ),
  }),

  columnHelper.display({
    id: 'order_status',
    header: 'Order Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.order_status;
      const style = orderStatusStyles[status] || 'bg-gray-100 text-gray-800';
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
        >
          {status}
        </span>
      );
    },
  }),

  columnHelper.display({
    id: 'action',
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <Dropdown>
          <Dropdown.Trigger as="button">
            <Tooltip
              size="sm"
              content={'Action'}
              placement="top"
              color="invert"
            >
              <ActionIcon variant="outline" rounded="full" as="span">
                <CiSliderHorizontal className="h-5 w-5" />
              </ActionIcon>
            </Tooltip>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item
              className="p-3"
              onClick={() =>
                meta?.handleConfirmedRow &&
                meta.handleConfirmedRow(row.original)
              }
            >
              <IoMdDoneAll className="me-2 text-blue-600" />
              Order Dikonfirmasi
            </Dropdown.Item>
            <Dropdown.Item
              className="p-3"
              onClick={() =>
                meta?.handleProcessedRow &&
                meta.handleProcessedRow(row.original)
              }
            >
              <TfiReload className="me-2 text-yellow-600" />
              Order Diproses
            </Dropdown.Item>
            <Dropdown.Item
              className="p-3"
              onClick={() =>
                meta?.handleCompletedRow &&
                meta.handleCompletedRow(row.original)
              }
            >
              <GiConfirmed className="me-2 text-green-600" />
              Order Selesai
            </Dropdown.Item>
            <Dropdown.Item
              className="p-3"
              onClick={() =>
                meta?.handleCancelledRow &&
                meta.handleCancelledRow(row.original)
              }
            >
              <MdOutlineCancel className="me-2 text-red-600" />
              Order Dibatalkan
            </Dropdown.Item>
            {row.original.order_status === 'Order Selesai' ? (
              <Link href={`/kasir/invoice/${row.original.id}`}>
                <Dropdown.Item
                  className="p-3"
                  disabled={row.original.order_status !== 'Order Selesai'}
                >
                  <TbFileInvoice className="me-2 text-gray-600" />
                  Invoice
                </Dropdown.Item>
              </Link>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
        {row.original.order_status === 'Order Dibatalkan' ? (
          <DeletePopover
            title={`Delete the checkout`}
            description={`Are you sure you want to delete this Checkout?`}
            onDelete={() => {
              meta?.handleDeleteRow?.(row.original);
            }}
          />
        ) : null}
      </Flex>
    ),
  }),
];
