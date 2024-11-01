'use client';

import PageHeader from '@/shared/page-header';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAnglesLeft } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';
import { ActionIcon, Button, Input, Modal, Title } from 'rizzui';

import TableOrders from './shared/partials/table';
import { Form } from '@/components/ui/form';
import {
  validationSchema,
  ValidationSchema,
} from './shared/partials/validationSchema';
import { getAllOrders } from './shared/core/_requests';
import { OrdersType } from './shared/core/_models';

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

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const totalPriceItems = ordersList.map((item: OrdersType) => {
    return item?.total_price || 0;
  });

  const total = totalPriceItems.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  const onSubmit = (values: any) => {
    console.log(values);
  };

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

              {/* <ModalCheckouts
                modalState={modalState}
                setModalState={setModalState}
              /> */}
              <Form<ValidationSchema>
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ register, formState: { errors } }) => (
                  <div className="mt-4 space-y-3">
                    <Modal
                      isOpen={modalState}
                      onClose={() => setModalState(false)}
                    >
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
                        <div className="">
                          <Input
                            label="Payment Amount *"
                            inputClassName="border-2"
                            placeholder="Input payment amount..."
                            size="lg"
                            type="number"
                            {...register('payment_amount')}
                            error={errors.payment_amount?.message}
                          />

                          <Input
                            label="Seat Number *"
                            inputClassName="border-2 "
                            placeholder="Input seat number..."
                            size="lg"
                            className="mt-3"
                            {...register('seat_number')}
                            error={errors.seat_number?.message}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="col-span-2 mt-5 w-full"
                            onClick={() => setModalState(false)}
                          >
                            Checkout Orders
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function ModalCheckouts({
//   modalState,
//   setModalState,
// }: {
//   modalState: boolean;
//   setModalState: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   return (
//     <>
//       <Modal isOpen={modalState} onClose={() => setModalState(false)}>
//         <div className="m-auto px-7 pb-8 pt-6">
//           <div className="mb-7 flex items-center justify-between">
//             <Title as="h5" className="font-semibold">
//               Checkout Orders
//             </Title>
//             <ActionIcon
//               size="sm"
//               variant="text"
//               onClick={() => setModalState(false)}
//             >
//               <IoMdClose className="h-auto w-6" strokeWidth={1.8} />
//             </ActionIcon>
//           </div>
//           <div className="">
//             <Input
//               label="Payment Amount *"
//               inputClassName="border-2"
//               placeholder="Input payment amount..."
//               size="lg"
//               type="number"
//             />

//             <Input
//               label="Seat Number *"
//               inputClassName="border-2 "
//               placeholder="Input seat number..."
//               size="lg"
//               className="mt-3"
//             />

//             <Button
//               type="submit"
//               size="lg"
//               className="col-span-2 mt-5 w-full"
//               onClick={() => setModalState(false)}
//             >
//               Checkout Orders
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }
