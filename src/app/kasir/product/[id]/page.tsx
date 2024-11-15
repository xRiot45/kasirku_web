'use client';

import { formatToRupiah } from '@/utils/formatRupiah';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { PiMinus, PiPlus, PiShoppingCartSimple } from 'react-icons/pi';
import { Button, Radio, Text, Title } from 'rizzui';

import { IAddProductToCartRequest } from '@/services/carts/_models';
import { addProductToCart } from '@/services/carts/_requests';
import { getProductById } from '@/services/products/_requests';
import PageHeader from '@/shared/page-header';
import { FaAnglesLeft } from 'react-icons/fa6';

const pageHeader = {
  title: 'Kasir',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Product',
    },
    {
      name: 'Detail',
    },
  ],
};

export default function ProductDetail() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id: string | undefined = pathname.split('/').pop();
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: IAddProductToCartRequest) => addProductToCart(data),
    onSuccess: () => {
      toast.success('Add product to cart successfully!');
      queryClient.invalidateQueries({ queryKey: ['cart'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['cart'] });
      });
    },
    onError: (error) => {
      toast.error('An error occurred while adding data, please try again!');
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IAddProductToCartRequest = {
      productId: id ?? '',
      selected_variant: formData.get('selected_variant') as string,
      quantity: quantity,
    };

    mutation.mutate(data);
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      />
      <div className="mt-10">
        <Button className="mb-6 h-11 w-64 gap-3" onClick={() => router.back()}>
          <FaAnglesLeft />
          Back to previous page
        </Button>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Kolom Gambar Produk */}
          <div className="col-span-6 mb-7 lg:mb-10 3xl:pe-10">
            <div className="relative mx-auto aspect-[4/4.65] w-full overflow-hidden rounded bg-gray-100 xl:rounded-md">
              <Image
                fill
                priority
                src={`${process.env.API_URL}/${data?.product_photo}`}
                alt={'Product Gallery'}
                className="h-full w-full object-cover"
                unoptimized={true}
              />
            </div>
          </div>

          {/* Kolom Detail Produk */}
          <div className="col-span-6 mb-7 lg:mb-10">
            <div className="flex items-center justify-between border-b">
              <div className="border-muted pb-6 lg:pb-8">
                <Title as="h2" className="6xl:text-4xl mb-2.5 font-bold">
                  {data?.product_name}
                </Title>
                <Text as="p" className="text-base font-semibold">
                  {data?.product_category?.product_category_name}
                </Text>
              </div>

              <Text
                as="p"
                className={`text-base italic ${data?.product_status === 'Tersedia' ? 'text-green-500' : 'text-red-500'}`}
              >
                {data?.product_status}
              </Text>
            </div>

            <form className="pb-8 pt-5" onSubmit={onSubmit}>
              <div className="mb-1.5 mt-2 font-lexend text-base">
                <div className="-mb-0.5 text-2xl font-semibold text-gray-900 lg:text-3xl">
                  {formatToRupiah(data?.product_price as number)}
                </div>

                <Text
                  as="p"
                  className="mt-2 text-sm font-semibold text-amber-600"
                >
                  {data?.product_stock} In Stock
                </Text>
              </div>

              <div className="mb-3.5 mt-4 pt-6">
                <Title as="h5" className="font-inter text-sm font-medium">
                  Select Variant
                </Title>

                <div className="mt-4 flex items-center gap-6">
                  {data?.product_variants?.map((variant, index) => (
                    <Radio
                      key={index}
                      label={variant?.variant}
                      name="selected_variant"
                      value={variant?.variant}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3.5 mt-4 pt-6">
                <Title as="h5" className="font-inter text-sm font-medium">
                  Product Description
                </Title>

                <div className="mt-4 flex items-center gap-6 text-justify leading-8">
                  <p>{data?.product_description}</p>
                </div>
              </div>

              <div className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-1 duration-200 hover:border-gray-900">
                <button
                  title="Decrement"
                  onClick={decrementQuantity}
                  type="button"
                  className="flex items-center justify-center rounded p-2 duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <PiMinus className="h-3.5 w-3.5" />
                </button>
                <span className="grid w-8 place-content-center font-medium">
                  {quantity}
                </span>
                <button
                  title="Increment"
                  onClick={incrementQuantity}
                  type="button"
                  className="flex items-center justify-center rounded p-2 duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <PiPlus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-7 @md:grid-cols-2 @xl:gap-6">
                <Button
                  size="xl"
                  type="submit"
                  className="h-12 text-sm lg:h-14 lg:text-base"
                >
                  <PiShoppingCartSimple className="me-2 h-5 w-5 lg:h-[22px] lg:w-[22px]" />{' '}
                  Add Product To Cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
