'use client';

import { useQuery } from '@tanstack/react-query';
import TableOrders from './partials/table';
import { getAllOrders } from '../shared/core/_requests';
import { formatToRupiah } from '@/utils/formatRupiah';
import PageHeader from '@/shared/page-header';
import { OrdersType } from '../shared/core/_models';
import { Button } from 'rizzui';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { IoBagCheckOutline } from 'react-icons/io5';

const pageHeader = {
  title: 'Kasirku',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Orders',
    },
  ],
};

export default function Orders() {
  const router = useRouter();
  const {
    data: ordersQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: ordersData } = ordersQueryResponse || {};
  const ordersList = ordersData || [];

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const totalPriceItems = ordersList.map((item: OrdersType) => {
    return item.product?.product_price || 0;
  });

  const total = totalPriceItems.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      />

      <Button className="mb-6 h-11 w-64 gap-3" onClick={() => router.back()}>
        <FaAnglesLeft />
        Back to previous page
      </Button>
      <div className="@container">
        <div className="items-start">
          <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
            <div className="pb-5">
              <TableOrders data={ordersList} />
              <div className="border-t border-muted pt-7 @5xl:mt-3">
                <div className="ms-auto max-w-lg space-y-6">
                  <div className="flex justify-between font-medium">
                    Subtotal <span>{formatToRupiah(total)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    Delivery <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                    Total <span>{formatToRupiah(total)}</span>
                  </div>

                  <Button className="mb-6 h-11 w-full gap-3 bg-green-600 hover:bg-green-700">
                    <IoBagCheckOutline />
                    Checkout Orders
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
