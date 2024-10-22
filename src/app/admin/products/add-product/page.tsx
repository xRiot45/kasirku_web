'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/shared/page-header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { ProductsRequest } from '../shared/core/_models';
import { createProduct } from '../shared/core/_requests';
import FormLayout from '../shared/form';
import {
  validationSchema,
  ValidationSchema,
} from '../shared/form/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const pageHeader = {
  title: 'Add Product',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Product',
    },
    {
      name: 'Add Product',
    },
  ],
};

export default function AddProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Inisialisasi useForm dari react-hook-form
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<ValidationSchema>({
    defaultValues: {
      product_name: '',
      product_stock: '',
      product_price: '',
      product_description: '',
      product_variants: [],
      // product_photo: [{ filename: '' }],
      productCategoryId: '',
    },
    // resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: (data: ProductsRequest) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['products'] });
      });
      toast.success('Add product successfully!');
      router.push(routes.products.index);
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response?.status === 409) {
        toast.error('Product Already Exists!');
      } else {
        toast.error('An error occurred while adding data, please try again!');
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
    const updateProfileRequest: ProductsRequest = {
      ...formData,
      product_photo:
        formData.product_photo && formData.product_photo.length > 0
          ? formData.product_photo[0]
          : null,
    };

    mutation.mutate(updateProfileRequest);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormLayout
          register={register}
          errors={errors}
          control={control}
          selectedPhoto={selectedPhoto}
          handlePhotoChange={handlePhotoChange}
        />

        <div className="flex items-center justify-end gap-3">
          <Button type="submit" size="lg">
            Add Product
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
      </form>
    </>
  );
}
