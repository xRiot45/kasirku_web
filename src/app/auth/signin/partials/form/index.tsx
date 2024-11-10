'use client';

import { Form } from '@/components/ui/form';
import { decodeToken } from '@/utils/decode-token';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiArrowRightBold } from 'react-icons/pi';
import { Button, Input, Password } from 'rizzui';
import { LoginRequest } from '../../core/_models';
import { loginRequest } from '../../core/_requests';
import { ValidationSchema, validationSchema } from './validationSchema';

export default function SignInForm() {
  const router = useRouter();
  const [reset, setReset] = useState({});
  const initialValues: LoginRequest = {
    email: '',
    password: '',
  };

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => loginRequest(data),
    onSuccess: async (data) => {
      const { access_token: accessToken, refresh_token: refreshToken } =
        data?.data || {};

      const userData = decodeToken(accessToken);
      const roleName: string | undefined = userData?.role?.role_name;

      const roleRoutes: { [key: string]: string } = {
        Admin: '/admin/dashboard',
        Kasir: '/kasir',
        Koki: '/koki',
      };

      if (roleName && roleRoutes[roleName]) {
        Cookies.set('access_token', accessToken);
        Cookies.set('refresh_token', refreshToken);

        toast.success('Sign in successfully!');

        router.push(roleRoutes[roleName]);

        setReset({
          email: '',
          password: '',
        });
      }
    },
    onError: () => {
      toast.error('Email or Password is incorrect!');
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Form<ValidationSchema>
        validationSchema={validationSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button
              className="w-full bg-amber-500 hover:bg-amber-700"
              type="submit"
              size="xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span>Loading...</span>
              ) : (
                <span>Sign in</span>
              )}{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
