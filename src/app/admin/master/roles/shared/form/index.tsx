import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from 'rizzui';
import { RoleRequest } from '../core/_models';

interface FormProps {
  register: UseFormRegister<RoleRequest>;
  errors: FieldErrors<RoleRequest>;
}

export default function FormLayout(props: FormProps) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Role Name"
        placeholder="Input role name..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('role_name')}
        error={errors.role_name?.message}
      />
    </>
  );
}
