'use client';

import DeletePopover from '@/components/delete-popover';
import CogSolidIcon from '@/components/icons/cog-solid';
import { useDrawer } from '@/shared/drawer-views/use-drawer';
import cn from '@/utils/class-names';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ActionIcon, Title } from 'rizzui';
import { getAllCarts } from '../../core/_requests';
import CartHeader from './cart-header';

export default function Carts({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openDrawer, closeDrawer } = useDrawer();

  const {
    data: cartsQueryResponse,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getAllCarts(),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: cartsData, totalItems } = cartsQueryResponse || {};
  const cartsList = cartsData || [];

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <CartHeader onClose={closeDrawer} />
              <div className="divide-y divide-gray-100 px-6">
                {cartsList.map((item) => (
                  <div key={item.id} className={cn('group py-5')}>
                    <div className="flex items-start pe-2">
                      <figure className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          alt={item.product?.product_name}
                          src={`${process.env.API_URL}/${item.product?.product_photo}`}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw"
                          className="h-full w-full object-cover"
                        />
                      </figure>
                      <div className="w-full truncate ps-3">
                        <Title
                          as="h3"
                          className="mb-1 flex items-center justify-between truncate font-inter text-sm font-semibold text-gray-900"
                        >
                          <Link href={`/kasir/product/${item?.product.id}`}>
                            {item.product?.product_name}
                          </Link>
                          <DeletePopover
                            title={`Delete the product`}
                            description={`Are you sure you want to delete this product in cart?`}
                          />
                        </Title>
                        <div className="flex items-end justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="text-xs font-medium text-gray-500">
                              {formatToRupiah(item?.product?.product_price)} x{' '}
                              {item.quantity}
                            </div>
                            <div className="flex items-center gap-3 whitespace-nowrap font-semibold text-gray-900">
                              {formatToRupiah(
                                item?.product?.product_price * item.quantity
                              )}
                            </div>
                          </div>
                          {/* <QuantityControl item={item} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
