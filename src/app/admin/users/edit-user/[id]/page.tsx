'use client';

import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import PageHeader from '@/shared/page-header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { getUserById, updateProfileByAdmin } from '../../shared/core/_requests';
import FormLayout from './form';
import { validationSchema, ValidationSchema } from './form/validationSchema';
import { UpdateProfileRequest } from '../../shared/core/_models';
import { useState } from 'react';

const pageHeader = {
  title: 'Edit User',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Users',
    },
    {
      name: 'Edit User',
    },
  ],
};

export default function EditUserPage() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const id: string | undefined = pathname.split('/').pop();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['role', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfileByAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['users'] });
      });
      toast.success('Edit user successfully!');
      router.push(routes.users.index);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast.error('Full name Already Used!');
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
    const updateProfileRequest: UpdateProfileRequest = {
      ...formData,
      birthday_date: formData.birthday_date
        ? new Date(formData.birthday_date).toISOString().split('T')[0]
        : null,
      photo:
        formData.photo && formData.photo.length > 0 ? formData.photo[0] : null,
    };

    mutation.mutate(updateProfileRequest);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            full_name: data?.full_name || '',
            birthday_date: data?.birthday_date
              ? (new Date(data.birthday_date) as Date)
              : (new Date() as Date),
            place_of_birth: data?.place_of_birth || '',
            phone_number: data?.phone_number || '',
            gender: data?.gender || '',
            address: data?.address || '',
            photo: [],
            roleId: data?.role?.id || '',
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
            />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Data User
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
    </>
  );
}
