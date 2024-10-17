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
import { RoleRequest } from '../shared/core/_models';
import { createRole } from '../shared/core/_requests';
import FormLayout from '../shared/form';
import {
  validationSchema,
  ValidationSchema,
} from '../shared/form/validationSchema';

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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: RoleRequest) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['roles'] });
      });
      toast.success('Add role successfully!');
      router.push(routes.roles.index);
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
