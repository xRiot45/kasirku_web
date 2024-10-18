'use client';

import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import PageHeader from '@/shared/page-header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { ProductCategoryRequest } from '../shared/core/_models';
import { createProductCategory } from '../shared/core/_requests';
import FormLayout from '../shared/form';
import {
  validationSchema,
  ValidationSchema,
} from '../shared/form/validationSchema';

const pageHeader = {
  title: 'Add Product Category',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Master Data',
    },
    {
      name: 'Product Category',
    },
    {
      name: 'Add Product Category',
    },
  ],
};

export default function AddProductCategoryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ProductCategoryRequest) => createProductCategory(data),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['product-category'] })
        .then(() => {
          queryClient.refetchQueries({ queryKey: ['product-category'] });
        });
      toast.success('Add product category successfully!');
      router.push(routes.productCategory.index);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('Product Category Already Exists!');
      } else {
        toast.error('An error occurred while adding data, please try again!');
      }
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mt-8">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors } }) => (
          <div className="mt-4 space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Add Product Category
              </Button>
              <Link href={routes.productCategory.index}>
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
    </div>
  );
}
