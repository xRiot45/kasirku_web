import { HeaderCell } from '@/components/legacy-table';
import { formatToRupiah } from '@/utils/formatRupiah';
import Image from 'next/image';
import { Text, Title } from 'rizzui';
import { DefaultRecordType } from 'rc-table/lib/interface';
import DeletePopover from '@/components/delete-popover';

export const columns = (handleDeleteOrderById: (id: string) => void) => [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product_photo',
    key: 'product_photo',
    width: 250,
    render: (_: any, row: DefaultRecordType) => (
      <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Image
            alt={row.product?.product_name}
            src={`${process.env.API_URL}/${row?.product?.product_photo}`}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="ms-4">
          <Title as="h6" className="!text-sm font-medium">
            {row?.product?.product_name}
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Product Price" align="right" />,
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (_: any, row: DefaultRecordType) => (
      <Text className="text-end text-sm">
        {formatToRupiah(row?.product?.product_price)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Quantity" align="right" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 150,
    render: (quantity: number) => (
      <Text className="text-end text-sm font-semibold">{quantity}</Text>
    ),
  },

  {
    title: <HeaderCell title="Selected Variant" align="right" />,
    dataIndex: 'selected_variant',
    key: 'selected_variant',
    width: 150,
    render: (selected_variant: string) => (
      <Text className="text-end text-sm font-semibold">{selected_variant}</Text>
    ),
  },

  {
    title: <HeaderCell title="Total Price" align="right" />,
    dataIndex: 'total_price',
    key: 'total_price',
    width: 200,
    render: (total_price: number) => (
      <Text className="text-end text-sm">{formatToRupiah(total_price)}</Text>
    ),
  },

  {
    title: <HeaderCell title="Action" align="right" />,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: any, row: DefaultRecordType) => (
      <div className="text-end">
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this order?`}
          onDelete={() => handleDeleteOrderById(row.id)}
        />
      </div>
    ),
  },
];
