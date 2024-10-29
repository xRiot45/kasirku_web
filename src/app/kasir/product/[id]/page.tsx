'use client';

import { formatToRupiah } from '@/utils/formatRupiah';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { Button, Radio, Text, Title } from 'rizzui';
import { getProductById } from '../../shared/core/_requests';

export default function ProductDetail() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const id: string | undefined = pathname.split('/').pop();

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  return (
    <div className="gap-6 3xl:grid 3xl:grid-cols-12">
      {/* Kolom Gambar Produk */}
      <div className="container col-span-7 mb-7 lg:mb-10 3xl:pe-10">
        <div className="relative mx-auto aspect-[4/4.65] w-full overflow-hidden rounded bg-gray-100 xl:rounded-md">
          <Image
            fill
            priority
            src={`${process.env.API_URL}/${data?.product_photo}`}
            alt={'Product Gallery'}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Kolom Detail Produk */}
      <div className="col-span-5 mb-7 lg:mb-10">
        <div className="flex items-center justify-between">
          <div className="border-b border-muted pb-6 lg:pb-8">
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

        <form className="pb-8 pt-5">
          <div className="mb-1.5 mt-2 font-lexend text-base">
            <div className="-mb-0.5 text-2xl font-semibold text-gray-900 lg:text-3xl">
              {formatToRupiah(data?.product_price as number)}
            </div>

            <Text as="p" className="mt-2 text-sm font-semibold text-amber-600">
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
                  name="product_variant"
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

        {/* <Collapse
          className="border-t last-of-type:border-t-0"
          defaultOpen={true}
          header={({ open, toggle }) => (
            <div
              role="button"
              onClick={toggle}
              className="flex w-full cursor-pointer items-center justify-between py-6 font-lexend text-lg font-semibold text-gray-900"
            >
              Product Details
              <div className="flex shrink-0 items-center justify-center">
                <PiCaretDownBold
                  className={cn(
                    'h-[18px] w-[18px] transform transition-transform duration-300',
                    open && 'rotate-180'
                  )}
                />
              </div>
            </div>
          )}
        >
          <div className="-mt-2 pb-7">
            <Text as="p" className="pb-2 leading-relaxed">
              Monochrome elegance. Made with a relaxed wide-leg, these trousers
              are made from a sustainable soft organic cotton with a mechanical
              stretch making the garment easily recycled.
            </Text>
            <ul className="space-y-2.5">
              <li>Synthetic leather upper</li>
              <li>Cushioned footbed</li>
              <li>Textured and patterned outsole</li>
              <li>Warranty: 1 month</li>
            </ul>
            <Title as="h6" className="mt-6 font-inter text-sm font-semibold">
              Material & Care
            </Title>
            <ul className="space-y-2.5 pt-3.5">
              <li>Synthetic Leather</li>
              <li>EASY WIPE CLEAN</li>
            </ul>
            <div className="mt-6 flex items-start">
              <div className="me-3 mt-1 flex shrink-0 items-center font-medium text-gray-900">
                <PiTagLight className="me-1.5 h-[18px] w-[18px]" /> Tags:
              </div>
              <ul className="-m-1 text-gray-900">
                <li className="m-1 inline-flex rounded bg-gray-100 px-2.5 py-1">
                  Shoe
                </li>
                <li className="m-1 inline-flex rounded bg-gray-100 px-2.5 py-1">
                  Fashion
                </li>
                <li className="m-1 inline-flex rounded bg-gray-100 px-2.5 py-1">
                  Men
                </li>
                <li className="m-1 inline-flex rounded bg-gray-100 px-2.5 py-1">
                  Nike
                </li>
              </ul>
            </div>
          </div>
        </Collapse> */}
      </div>
    </div>
  );
}
