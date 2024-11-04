import TrashIcon from '@/components/icons/trash';
import SelectProductCategory from '@/components/select/SelectProductCategory';
import Image from 'next/image';
import { useCallback } from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { PiPlusBold } from 'react-icons/pi';
import { ActionIcon, Button, FileInput, Input, Textarea } from 'rizzui';
import { ValidationSchema } from './validationSchema';
import { IProducts } from '@/services/products/_models';

interface PropTypes {
  register: UseFormRegister<ValidationSchema>;
  control: Control<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  selectedPhoto: string | null;
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: IProducts;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors, control, selectedPhoto, handlePhotoChange, data } =
    props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product_variants',
  });

  const addVariant = useCallback(() => append(''), [append]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <Input
          type="text"
          size="lg"
          label="Product Name"
          placeholder="Input product name..."
          className="w-full [&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('product_name')}
          error={errors.product_name?.message}
        />

        <Input
          type="number"
          size="lg"
          label="Product Stock"
          placeholder="Input product stock..."
          className="w-full [&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('product_stock')}
          error={errors.product_stock?.message}
        />

        <Input
          type="number"
          size="lg"
          label="Product Price"
          placeholder="Input product price..."
          className="w-full [&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('product_price')}
          error={errors.product_price?.message}
        />
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            type="text"
            size="lg"
            label="Product Variants"
            placeholder="Input product variants..."
            className="w-full [&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register(`product_variants.${index}`)}
            error={
              errors.product_variants?.[index]?.message as string | undefined
            }
          />

          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}

      <Button
        onClick={addVariant}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" /> Add Variant
      </Button>

      <Textarea
        label="Product Description"
        placeholder="Input product description..."
        className="w-full [&>label>span]:font-medium"
        {...register('product_description')}
        error={errors.product_description?.message}
      />

      <SelectProductCategory
        control={control}
        error={errors.productCategoryId?.message}
      />

      <FileInput
        label="Product Photo"
        {...register('product_photo')}
        onChange={handlePhotoChange}
        error={
          typeof errors.product_photo?.message === 'string'
            ? errors.product_photo?.message
            : undefined
        }
      />

      {selectedPhoto ? (
        <div className="mt-4">
          <Image
            src={selectedPhoto}
            alt={'Product photo'}
            width={1000}
            height={1000}
            className="h-96 w-96"
            priority
          />
        </div>
      ) : data?.product_photo ? (
        <div className="mt-4">
          <Image
            src={`${process.env.API_URL}/${data.product_photo}`}
            alt={'Existing product photo'}
            width={1000}
            height={1000}
            className="h-96 w-96"
            priority
          />
        </div>
      ) : null}
    </>
  );
}
