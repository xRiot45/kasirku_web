import { Input } from 'rizzui';

export default function FormLayout(props: any) {
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
