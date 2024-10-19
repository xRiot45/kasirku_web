import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Flex, Input } from 'rizzui';
import { RegisterUserRequest } from '../../shared/core/_models';
import SelectRole from '@/components/select/SelectRole';

interface FormProps {
  register: UseFormRegister<RegisterUserRequest>;
  errors: FieldErrors<RegisterUserRequest>;
  control: Control<RegisterUserRequest>;
}

export default function FormLayout(props: FormProps) {
  const { register, errors, control } = props;
  return (
    <>
      <Flex direction="row" className="w-full">
        <Input
          type="email"
          size="lg"
          label="Email"
          placeholder="Input email employee..."
          className="w-full [&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          type="text"
          size="lg"
          label="Full Name"
          placeholder="Input full name employee..."
          className="w-full [&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('full_name')}
          error={errors.full_name?.message}
        />
      </Flex>

      <SelectRole control={control} error={errors.roleId?.message} />
    </>
  );
}
