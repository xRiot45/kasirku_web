'use client';

import FormFooter from '@/components/form-footer';
import FormGroup from '@/components/form-group';
import SelectGender from '@/components/select/SelectGender';
import { IUpdateProfileRequest, IUsers } from '@/services/users/_models';
import { getDataUser, updateProfileUser } from '@/services/users/_requests';
import { DatePicker } from '@/ui/datepicker';
import { Form } from '@/ui/form';
import cn from '@/utils/class-names';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiSealCheckFill } from 'react-icons/pi';
import { FileInput, Input, Text, Title } from 'rizzui';
import { ValidationSchema, validationSchema } from './validationSchema';
import BlankProfile from '@public/images/blank-profile.png';

export default function ProfileSettingsView() {
  const queryClient = useQueryClient();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => getDataUser(),
  });

  const mutation = useMutation({
    mutationFn: (data: IUpdateProfileRequest) => updateProfileUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Edit profile successfully!');
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
    const updateProfileRequest: IUpdateProfileRequest = {
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
      <Form<ValidationSchema>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
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
          },
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <ProfileHeader
                data={data}
                title={data?.full_name ?? ''}
                description="Update your photo and personal details."
              />

              <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 px-8 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Full Name"
                  className="w-full pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    placeholder="Full Name"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register('full_name')}
                    error={errors.full_name?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Birtday Date"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Controller
                    name="birthday_date"
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <DatePicker
                        className="col-span-full"
                        placeholderText="Select Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        // value={data?.birthday_date}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title="Place Of Birth"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    placeholder="Place of Birth"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register('place_of_birth')}
                    error={errors.place_of_birth?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Phone Number"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="number"
                    size="lg"
                    placeholder="Input phone number..."
                    className="col-span-full [&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('phone_number')}
                    error={errors.phone_number?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Gender"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <SelectGender
                    control={control as unknown as Control<FieldValues>}
                    errors={errors.gender?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Address"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="text"
                    size="lg"
                    placeholder="Input address..."
                    className="col-span-full [&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('address')}
                    error={errors.address?.message}
                  />
                </FormGroup>

                <FormGroup
                  title="Your Photo"
                  description="This will be displayed on your profile."
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <FileInput
                    multiple={false}
                    className="col-span-full"
                    {...register('photo')}
                    error={
                      typeof errors.photo?.message === 'string'
                        ? errors.photo?.message
                        : undefined
                    }
                    onChange={handlePhotoChange}
                  />

                  {selectedPhoto && (
                    <div className="mt-4">
                      <Image
                        src={selectedPhoto}
                        alt={'User photo'}
                        width={1000}
                        height={1000}
                        className="h-auto w-auto"
                        priority
                      />
                    </div>
                  )}
                </FormGroup>
              </div>
              <FormFooter
                isLoading={isPending}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  title,
  description,
  children,
  data,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  data?: IUsers;
}>) {
  return (
    <div
      className={cn(
        'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10'
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted px-8 pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          {data?.photo ? (
            <Image
              src={`${process.env.API_URL}/${data?.photo ?? ''}`}
              alt="profile-pic"
              fill
              sizes="(max-width: 768px) 100vw"
              className="aspect-auto object-cover"
            />
          ) : (
            <Image
              src={BlankProfile}
              alt="blank profile"
              fill
              sizes="(max-width: 768px) 100vw"
              className="aspect-auto object-cover"
            />
          )}
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? (
            <Text className="text-sm text-gray-500">{description}</Text>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
