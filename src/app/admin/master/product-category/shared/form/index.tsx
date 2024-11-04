import { IProductCategoryRequest } from '@/services/product-category/_models';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from 'rizzui';

interface FormProps {
  register: UseFormRegister<IProductCategoryRequest>;
  errors: FieldErrors<IProductCategoryRequest>;
}

export default function FormLayout(props: FormProps) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Product Category Name"
        placeholder="Input product category name..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('product_category_name')}
        error={errors.product_category_name?.message}
      />
    </>
  );
}
