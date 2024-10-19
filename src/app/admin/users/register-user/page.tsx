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
import { RegisterUserRequest } from '../shared/core/_models';
import { registerUser } from '../shared/core/_requests';
import FormLayout from './form/form';
import { validationSchema, ValidationSchema } from './form/validationSchema';

const pageHeader = {
  title: 'Register User',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Users',
    },
    {
      name: 'Register User',
    },
  ],
};

export default function RegisterUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: RegisterUserRequest) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['users'] });
      });
      toast.success('Register user successfully!');
      router.push(routes.users.index);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('User Already Exists!');
      } else {
        toast.error('An error occurred while adding data, please try again!');
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
        >
          {({ control, register, formState: { errors } }) => (
            <div className="mt-4 space-y-6">
              <FormLayout
                control={control}
                register={register}
                errors={errors}
              />

              <div className="flex items-center justify-end gap-3">
                <Button type="submit" size="lg">
                  Register User
                </Button>
                <Link href={routes.users.index}>
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
