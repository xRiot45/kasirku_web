import { IProducts } from '@/services/products/_models';
import cn from '@/utils/class-names';
import { formatToRupiah } from '@/utils/formatRupiah';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Flex, Text, Title } from 'rizzui';

interface PropTypes {
  data: IProducts[];
}

export default function CardProducts(props: PropTypes) {
  const { data } = props;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
      {data.map((product) => (
        <div
          key={product.id}
          className={cn('pb-0.5', {
            'opacity-50 grayscale': product.product_status === 'Tidak Tersedia',
          })}
        >
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                alt={product.product_name}
                src={`${process.env.API_URL}/${product.product_photo}`}
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw"
                className="h-full w-full object-cover"
                unoptimized={true}
              />
            </div>
          </div>

          <div className="pt-3">
            <Flex justify="between" align="center">
              <Title as="h6" className="mb-1 truncate font-inter font-semibold">
                {product.product_name}
              </Title>

              <Title
                className={`mb-1 truncate font-inter text-xs font-medium ${product?.product_status === 'Tersedia' ? 'text-green-500' : 'text-red-500'}`}
              >
                {product.product_status}
              </Title>
            </Flex>

            <Text as="p" className="truncate">
              {product.product_category.product_category_name}
            </Text>
            <div className="mt-2 flex items-center font-semibold text-gray-900">
              {formatToRupiah(Number(product.product_price))}
            </div>
            <div className="mt-3">
              {product.product_status === 'Tersedia' ? (
                <Link href={`/kasir/product/${product.id}`}>
                  <Button className="w-full" variant="outline">
                    View Product
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  View Product
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
