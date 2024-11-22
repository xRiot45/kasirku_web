'use client';

import DeletePopover from '@/components/delete-popover';
import CogSolidIcon from '@/components/icons/cog-solid';
import SimpleBar from '@/components/ui/simplebar';
import {
  deleteAllCarts,
  deleteCartById,
  getAllCarts,
} from '@/services/carts/_requests';
import { createOrders } from '@/services/orders/_requests';
import { useDrawer } from '@/shared/drawer-views/use-drawer';
import cn from '@/utils/class-names';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ActionIcon, Button, EmptyBoxIcon, Flex, Title } from 'rizzui';
import CartHeader from './cart-header';

interface CartsProps {
  children?: React.ReactNode;
}

export default function Carts(props: CartsProps) {
  const { children } = props;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openDrawer, closeDrawer } = useDrawer();

  const { data: cartsQueryResponse, isPending } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getAllCarts(),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: cartsData } = cartsQueryResponse || {};
  const cartsList = cartsData || [];

  const deleteCartByIdMutation = useMutation({
    mutationFn: (id: string) => deleteCartById(id),
    onSuccess: () => {
      toast.success('Delete product in cart successfully!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      closeDrawer();
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const deleteAllCartItemsMutation = useMutation({
    mutationFn: () => deleteAllCarts(),
    onSuccess: () => {
      toast.success('Delete all product in cart successfully!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      closeDrawer();
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const createOdersMutation = useMutation({
    mutationFn: () => createOrders(),
    onSuccess: () => {
      toast.success('Create orders successfully!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      closeDrawer();
      router.push('/kasir/orders');
    },
    onError: () => {
      toast.error('An error occurred while create orders, please try again!');
    },
  });

  const onDeleteCartById = async (id: string) => {
    await deleteCartByIdMutation.mutateAsync(id);
  };

  const onDeleteCartItems = async () => {
    await deleteAllCartItemsMutation.mutateAsync();
  };

  const onCreateOrders = async () => {
    await createOdersMutation.mutateAsync();
  };

  const totalPriceItems = cartsList.map((item) => {
    return item.product?.product_price * item.quantity || 0;
  });

  const total = totalPriceItems.reduce((acc, curr) => acc + curr, 0);

  return (
    <ActionIcon
      aria-label="Carts"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] backdrop-blur-md md:h-9 md:w-9'
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <CartHeader onClose={closeDrawer} />

              {cartsList.length === 0 ? (
                <div className="flex h-screen items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <EmptyBoxIcon className="mt-10 h-32 w-32" />
                    <Title as="h6" className="font-medium text-gray-400">
                      Cart is empty
                    </Title>
                  </div>
                </div>
              ) : (
                <div>
                  <SimpleBar className="h-[calc(100vh-138px)] overflow-y-auto px-6">
                    <div className="flex-grow">
                      {cartsList.map((item) => (
                        <div key={item.id} className="group py-6">
                          <div className="flex items-start pe-2">
                            <figure className="relative aspect-square h-full w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                alt={item.product?.product_name}
                                src={`${process.env.API_URL}/${item.product?.product_photo}`}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw"
                                className="h-full w-full object-cover"
                                unoptimized={true}
                              />
                            </figure>
                            <div className="w-full truncate ps-3">
                              <div className="flex items-center justify-between">
                                <div className="mb-3 block">
                                  <Title
                                    as="h3"
                                    className="mb-1 truncate font-inter text-sm font-semibold text-gray-900"
                                  >
                                    <Link
                                      href={`/kasir/product/${item?.product.id}`}
                                    >
                                      {item.product?.product_name}
                                    </Link>
                                  </Title>

                                  <span className="italic">
                                    {item?.selected_variant}
                                  </span>
                                </div>

                                <DeletePopover
                                  title="Delete the product"
                                  description="Are you sure you want to delete this product in cart?"
                                  onDelete={() => onDeleteCartById(item.id)}
                                />
                              </div>
                              <div className="flex items-end justify-between">
                                <div className="flex flex-col gap-1">
                                  <div className="text-xs font-medium text-gray-500">
                                    {formatToRupiah(
                                      item?.product?.product_price
                                    )}{' '}
                                    x {item.quantity}
                                  </div>
                                  <div className="flex items-center gap-3 whitespace-nowrap font-semibold text-gray-900">
                                    {formatToRupiah(
                                      item?.product?.product_price *
                                        item.quantity
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SimpleBar>

                  {/* Button Section */}
                  <div className="sticky bottom-5 border-t border-gray-300 px-6 pt-4">
                    <div className="mb-7 space-y-3.5">
                      <p className="flex items-center justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          {formatToRupiah(total)}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="text-gray-500">Delivery</span>
                        <span className="font-medium text-gray-900">Free</span>
                      </p>
                      <p className="flex items-center justify-between border-t border-gray-300 pt-3.5 text-base font-semibold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-gray-900">
                          {formatToRupiah(total)}
                        </span>
                      </p>
                    </div>

                    <Flex justify="between" align="center">
                      <Button
                        className="h-11 w-full"
                        isLoading={isPending}
                        onClick={onCreateOrders}
                      >
                        Order Now
                      </Button>
                      <Button
                        className="h-11 w-full bg-red-500"
                        isLoading={isPending}
                        onClick={onDeleteCartItems}
                      >
                        Clear All Cart
                      </Button>
                    </Flex>
                  </div>
                </div>
              )}

              {/* Cart items list */}
            </>
          ),
          placement: 'right',
          containerClassName: 'max-w-[420px]',
        })
      }
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      )}
    </ActionIcon>
  );
}
