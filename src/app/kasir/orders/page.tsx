'use client';

import { Form } from '@/components/ui/form';
import { ICheckoutOrdersRequest } from '@/services/checkouts/_models';
import { checkout } from '@/services/checkouts/_requests';
import { IOrders } from '@/services/orders/_models';
import { deleteAllOrders, getAllOrders } from '@/services/orders/_requests';
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
import {
  ActionIcon,
  Button,
  EmptyBoxIcon,
  Flex,
  Input,
  Modal,
  Text,
  Title,
} from 'rizzui';
import TableOrders from './shared/partials/table';
import {
  validationSchema,
  ValidationSchema,
} from './shared/partials/validationSchema';
import Image from 'next/image';
import DeleteImage from '@public/images/delete.png';
import { FaRegTrashAlt } from 'react-icons/fa';
import ModalCheckout from './shared/partials/modals/modal-checkout';
import ModalDelete from './shared/partials/modals/modal-delete';

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
  const [modalCheckoutState, setModalCheckoutState] = useState<boolean>(false);
  const [modalDeleteState, setModalDeleteState] = useState<boolean>(false);

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

  const totalPriceItems = ordersList.map((item: IOrders) => {
    return item?.total_price || 0;
  });

  const total = totalPriceItems.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  const checkoutMutation = useMutation({
    mutationFn: (data: ICheckoutOrdersRequest) => checkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Checkout orders successfully!');
      router.push('/kasir/checkouts');
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

  const deleteAllOrdersMutation = useMutation({
    mutationFn: () => deleteAllOrders(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Delete all order successfully!');
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const handleCheckoutOrders: SubmitHandler<ValidationSchema> = (data) => {
    checkoutMutation.mutate(data);
  };

  const handleDeleteAllOrders = () => {
    deleteAllOrdersMutation.mutate();
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
                        size="lg"
                        onClick={() => setModalCheckoutState(true)}
                        className="w-full gap-3 bg-green-600 hover:bg-green-700"
                      >
                        <IoBagCheckOutline />
                        Checkout Orders
                      </Button>

                      <Button
                        size="lg"
                        className="w-full gap-3 bg-red-600 hover:bg-red-700"
                        onClick={() => setModalDeleteState(true)}
                      >
                        <FaRegTrashAlt />
                        Delete All Orders
                      </Button>
                    </div>
                  </div>

                  {/* Modal Checkout Orders Start */}
                  <ModalCheckout
                    handleCheckoutOrders={handleCheckoutOrders}
                    modalCheckoutState={modalCheckoutState}
                    setModalCheckoutState={setModalCheckoutState}
                  />
                  {/* Modal Checkout Orders End */}

                  {/* Modal Delete Orders Start */}
                  <ModalDelete
                    handleDeleteAllOrders={handleDeleteAllOrders}
                    modalDeleteState={modalDeleteState}
                    setModalDeleteState={setModalDeleteState}
                  />
                  {/* Moodal Delete Orders End */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
