import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Flex, Input } from 'rizzui';
import SelectRole from '@/components/select/SelectRole';
import { IRegisterRequest } from '@/services/users/_models';

interface FormProps {
  register: UseFormRegister<IRegisterRequest>;
  errors: FieldErrors<IRegisterRequest>;
  control: Control<IRegisterRequest>;
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

      <SelectRole
        control={control as unknown as Control<FieldValues>}
        errors={errors.roleId?.message ?? ''}
      />
    </>
  );
}
