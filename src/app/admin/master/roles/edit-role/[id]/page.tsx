'use client';

import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { IRoleRequest } from '@/services/roles/_models';
import { getRoleById, updateRole } from '@/services/roles/_requests';
import PageHeader from '@/shared/page-header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import FormLayout from '../../shared/form';
import {
  validationSchema,
  ValidationSchema,
} from '../../shared/form/validationSchema';

const pageHeader = {
  title: 'Edit Role',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Master Data',
    },
    {
      name: 'Roles',
    },
    {
      name: 'Edit Role',
    },
  ],
};

export default function EditRolePage() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const id: string | undefined = pathname.split('/').pop();

  const { data } = useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: IRoleRequest) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Edit role successfully!');
      router.push(routes.roles.index);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('Role Already Exists!');
      } else {
        toast.error('An error occurred while edit data, please try again!');
      }
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="mt-8">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />

        <Form<ValidationSchema>
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          useFormProps={{
            values: {
              role_name: data?.role_name || '',
            },
            mode: 'onChange',
          }}
        >
          {({ register, formState: { errors } }) => (
            <div className="mt-4 space-y-3">
              <FormLayout register={register} errors={errors} />

              <div className="flex items-center justify-end gap-3">
                <Button type="submit" size="lg">
                  Edit Role
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
    </>
  );
}
