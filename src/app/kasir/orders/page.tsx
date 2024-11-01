'use client';

import { Form } from '@/components/ui/form';
import PageHeader from '@/shared/page-header';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaAnglesLeft } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';
import { ActionIcon, Button, EmptyBoxIcon, Input, Modal, Title } from 'rizzui';
import { CheckoutOrdersRequest, OrdersType } from './shared/core/_models';
import { checkout, getAllOrders } from './shared/core/_requests';
import TableOrders from './shared/partials/table';
import {
  validationSchema,
  ValidationSchema,
} from './shared/partials/validationSchema';

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
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState<boolean>(false);

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

  const totalPriceItems = ordersList.map((item: OrdersType) => {
    return item?.total_price || 0;
  });

  const total = totalPriceItems.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  const mutation = useMutation({
    mutationFn: (data: CheckoutOrdersRequest) => checkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['orders'] });
      });
      toast.success('Checkout orders successfully!');
      setModalState(false);
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        toast.error('Payment amount is less than total order price');
      } else {
        toast.error(
          'An error occurred while checkout orders, please try again!'
        );
      }
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

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
              {ordersList.length === 0 ? (
                <div className="mt-20 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <EmptyBoxIcon className="mt-10 h-32 w-32" />
                    <Title as="h6" className="font-medium text-gray-400">
                      Orders is empty
                    </Title>
                  </div>
                </div>
              ) : (
                <div>
                  <TableOrders data={ordersList} />
                  <div className="border-t border-muted pt-7 @5xl:mt-3">
                    <div className="ms-auto mt-10 max-w-lg space-y-6">
                      <div className="flex justify-between font-medium">
                        Subtotal <span>{formatToRupiah(total)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        Delivery{' '}
                        <span className="font-semibold italic text-amber-600">
                          Free
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                        Total <span>{formatToRupiah(total)}</span>
                      </div>

                      <Button
                        onClick={() => setModalState(true)}
                        className="mb-6 h-11 w-full gap-3 bg-green-600 hover:bg-green-700"
                      >
                        <IoBagCheckOutline />
                        Checkout Orders
                      </Button>
                    </div>
                  </div>

                  {/* Pindahkan Form ke dalam Modal untuk memastikan konteks yang benar */}
                  <Modal
                    isOpen={modalState}
                    onClose={() => setModalState(false)}
                  >
                    <Form
                      onSubmit={onSubmit}
                      validationSchema={validationSchema as any}
                    >
                      {({ register, formState: { errors } }) => (
                        <div className="m-auto px-7 pb-8 pt-6">
                          <div className="mb-7 flex items-center justify-between">
                            <Title as="h5" className="font-semibold">
                              Checkout Orders
                            </Title>
                            <ActionIcon
                              size="sm"
                              variant="text"
                              onClick={() => setModalState(false)}
                            >
                              <IoMdClose
                                className="h-auto w-6"
                                strokeWidth={1.8}
                              />
                            </ActionIcon>
                          </div>
                          <div>
                            <Input
                              type="number"
                              size="lg"
                              label="Payment Amount *"
                              placeholder="Input payment amount..."
                              className="[&>label>span]:font-medium"
                              inputClassName="text-sm"
                              {...register('payment_amount')}
                              error={errors.payment_amount?.message}
                            />

                            <Input
                              type="text"
                              size="lg"
                              label="Seat Number *"
                              placeholder="Input seat number..."
                              className="mt-3 [&>label>span]:font-medium"
                              inputClassName="text-sm"
                              {...register('seat_number')}
                              error={errors.seat_number?.message}
                            />

                            <Button
                              type="submit"
                              size="lg"
                              className="col-span-2 mt-5 w-full"
                            >
                              Checkout Orders
                            </Button>
                          </div>
                        </div>
                      )}
                    </Form>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
