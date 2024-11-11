import { IProductCategory } from '@/services/product-category/_models';
import { getAllProductCategory } from '@/services/product-category/_requests';
import { useQuery } from '@tanstack/react-query';
import { Control, Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface PropTypes {
  control: Control;
  errors: string;
}

export default function SelectProductCategory(props: PropTypes) {
  const { control, errors } = props;
  const currentPage = 1;
  const limit = 10;

  const { data: productCategoryQueryResponse } = useQuery({
    queryKey: ['roles', currentPage, limit],
    queryFn: () => getAllProductCategory(currentPage, limit),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: productCategoryData } = productCategoryQueryResponse || {};
  const productCategoryList = productCategoryData || [];

  const optionProductCategory = productCategoryList.map(
    (item: IProductCategory) => ({
      value: item.id,
      label: item.product_category_name,
    })
  );

  const findSelectedOption = (value: string) => {
    return optionProductCategory.find((option) => option.value === value);
  };

  return (
    <>
      <Controller
        name="productCategoryId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Product Category"
              value={selectedOption || null}
              error={errors}
              placeholder="--- Select Product Category ---"
              dropdownClassName="!z-0"
              options={optionProductCategory}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
