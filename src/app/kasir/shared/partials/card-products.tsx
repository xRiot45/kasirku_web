import cn from '@/utils/class-names';
import { toCurrency } from '@/utils/to-currency';
import Image from 'next/image';
import { Button, Text, Title } from 'rizzui';
import { ProductsResponse } from '../core/_models';

interface PropTypes {
  data: ProductsResponse[];
}

export default function CardProducts(props: PropTypes) {
  const { data } = props;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
      {data.map((product) => (
        <div key={product.id} className={cn('pb-0.5')}>
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
              />
            </div>
          </div>

          <div className="pt-3">
            <Title as="h6" className="mb-1 truncate font-inter font-semibold">
              {product.product_name}
            </Title>

            <Text as="p" className="truncate">
              {product.product_category.product_category_name}
            </Text>
            <div className="mt-2 flex items-center font-semibold text-gray-900">
              {toCurrency(Number(product.product_price))}
            </div>
            <div className="mt-3">
              <Button onClick={() => null} className="w-full" variant="outline">
                View Product
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
