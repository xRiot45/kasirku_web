'use client';

import PrintButton from '@/components/print-button';
import Table from '@/components/ui/table';
import { getDetailCheckout } from '@/services/checkouts/_requests';
import PageHeader from '@/shared/page-header';
import { formatToRupiah } from '@/utils/formatRupiah';
import LogoImg from '@public/images/logo.png';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { useRef } from 'react';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';
import { Badge, Button, Text, Title } from 'rizzui';

const pageHeader = {
  title: 'Kasir',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Invoice',
    },
  ],
};

const columns = [
  {
    title: 'No',
    dataIndex: 'index',
    key: 'index',
    render: (_: any, __: DefaultRecordType, index: number) => (
      <Text className="font-medium">{index + 1}</Text>
    ),
  },
  {
    title: 'Item',
    dataIndex: 'product.product_name',
    key: 'product.product_name',
    render: (value: string, record: DefaultRecordType) => (
      <Text className="font-medium">{record.product.product_name}</Text>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'product.product_price',
    key: 'product.product_price',
    render: (value: string, record: DefaultRecordType) => (
      <Text className="font-medium">
        {formatToRupiah(record.product.product_price)}
      </Text>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (value: string, record: DefaultRecordType) => (
      <Text className="font-medium">{record.quantity}</Text>
    ),
  },
  {
    title: 'Total Price',
    dataIndex: 'total_price',
    key: 'total_price',
    render: (value: string, record: DefaultRecordType) => (
      <Text className="font-medium">
        {formatToRupiah(record.product.product_price * record.quantity)}
      </Text>
    ),
  },
];

export default function Invoice() {
  const router = useRouter();
  const printRef = useRef(null);
  const pathname = usePathname();
  const id: string | undefined = pathname.split('/').pop();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const { data } = useQuery({
    queryKey: ['checkouts', id],
    queryFn: () => getDetailCheckout(id),
    enabled: !!id,
  });

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton onClick={() => handlePrint()} title="Print Invoice" />
        </div>
      </PageHeader>

      <Button className="mb-6 h-11 w-64 gap-3" onClick={() => router.back()}>
        <FaAnglesLeft />
        Back to previous page
      </Button>

      <div
        className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10"
        ref={printRef}
      >
        <div className="mb-12 flex flex-col items-start justify-between md:mb-16 md:flex-row">
          <Image
            src={LogoImg}
            alt="Kasirku"
            width={150}
            height={150}
            priority
            className="mb-6 lg:mb-0"
          />
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color="success"
              rounded="md"
              className="mb-3 md:mb-2"
            >
              Paid
            </Badge>
            <Title as="h6">{data?.invoice}</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        <Table
          data={data?.orders}
          columns={columns}
          variant="minimal"
          rowKey={(record) => record.id}
          scroll={{ x: 660 }}
          className="mb-11"
        />

        <div className="flex flex-col-reverse items-start justify-end border-t border-muted pb-4 pt-8 xs:w-full xs:flex-row">
          <div className="w-full max-w-md xs:w-full">
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Checkout Date{' '}
              <Text as="span" className="font-semibold">
                {new Date(data?.checkout_date ?? '').toLocaleString()}
              </Text>
            </Text>
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Delivery{' '}
              <Text as="span" className="font-semibold">
                Free
              </Text>
            </Text>
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Payment Method{' '}
              <Text as="span" className="font-semibold">
                {data?.payment_method}
              </Text>
            </Text>
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Total{' '}
              <Text as="span" className="font-semibold">
                {formatToRupiah(data?.total_order_price ?? 0)}
              </Text>
            </Text>
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Payment Amount{' '}
              <Text as="span" className="font-semibold">
                {formatToRupiah(data?.payment_amount ?? 0)}
              </Text>
            </Text>
            <Text className="flex w-full items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Change Returned{' '}
              <Text as="span" className="font-semibold">
                {formatToRupiah(data?.change_returned ?? 0)}
              </Text>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
