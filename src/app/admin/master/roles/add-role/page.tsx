'use client';

import { Form } from '@/components/ui/form';
import PageHeader from '@/shared/page-header';
import Link from 'next/link';
import { Button } from 'rizzui';
import FormLayout from '../shared/form';
import {
  validationSchema,
  ValidationSchema,
} from '../shared/form/validationSchema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RoleRequest } from '../core/_models';
import { createRole } from '../core/_requests';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Add Role',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Master Data',
    },
    {
      href: '/admin/master/roles',
      name: 'Roles',
    },
    {
      name: 'Add Role',
    },
  ],
};

export default function AddRolePage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: RoleRequest) => createRole(data),
    onSuccess: () => {
      toast.success('Add role successfully!');
      router.push('/admin/master/roles');
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('Role Already Exists!');
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
                Add Role
              </Button>
              <Link href={routes.roles.index}>
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
