'use client';

import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import PageHeader from '@/shared/page-header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import FormLayout from '../form';
import { validationSchema, ValidationSchema } from '../form/validationSchema';
import { getProductById, updateProduct } from '@/services/products/_requests';
import { IProductsRequest } from '@/services/products/_models';

const pageHeader = {
  title: 'Edit Product',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Product',
    },
    {
      name: 'Edit Product',
    },
  ],
};

export default function EditProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const id: string | undefined = pathname.split('/').pop();

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(
    data?.product_photo || null
  );

  const mutation = useMutation({
    mutationFn: (data: IProductsRequest) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['products'] });
      });
      toast.success('Edit product successfully!');
      router.push(routes.products.index);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('Product name Already Used!');
      } else {
        toast.error('An error occurred while edit data, please try again!');
      }
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl);
    }
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (
    formData: ValidationSchema
  ) => {
    const addProductRequest: IProductsRequest = {
      ...formData,
      product_photo:
        formData.product_photo && formData.product_photo.length > 0
          ? formData.product_photo[0]
          : null,
      product_variants: formData.product_variants || [],
    };

    mutation.mutate(addProductRequest);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            product_name: data?.product_name || '',
            product_stock: data?.product_stock?.toString() || '',
            product_price: data?.product_price?.toString() || '',
            product_description: data?.product_description || '',
            product_variants:
              data?.product_variants?.map((variantObj) => variantObj.variant) ||
              [],
            product_photo: data?.product_photo || null,
            productCategoryId: data?.product_category?.id || '',
            product_status: data?.product_status || '',
          },
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout
              register={register}
              errors={errors}
              control={control}
              selectedPhoto={selectedPhoto}
              handlePhotoChange={handlePhotoChange}
              data={data}
            />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Product
              </Button>
              <Link href={routes.products.index}>
                <Button
                  size="lg"
                  className="cursor-pointer bg-red-500 hover:bg-red-700"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Form>
    </>
  );
}
