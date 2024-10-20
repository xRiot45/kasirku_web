import SelectGender from '@/components/select/SelectGender';
import SelectRole from '@/components/select/SelectRole';
import { DatePicker } from '@/ui/datepicker';
import { Controller } from 'react-hook-form';
import { FileInput, Input } from 'rizzui';

export default function FormLayout(props: any) {
  const { register, errors, control } = props;

  return (
    <>
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

      <Controller
        name="birthday_date"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePicker
            inputProps={{ label: 'Available date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />

      <Input
        type="text"
        size="lg"
        label="Place of Birth"
        placeholder="Input place of birth..."
        className="w-full [&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('place_of_birth')}
        error={errors.place_of_birth?.message}
      />

      <Input
        type="number"
        size="lg"
        label="Phone Number"
        placeholder="Input phone number..."
        className="w-full [&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('phone_number')}
        error={errors.phone_number?.message}
      />

      <SelectGender control={control} error={errors.gender?.message} />

      <Input
        type="text"
        size="lg"
        label="Address"
        placeholder="Input address..."
        className="w-full [&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('address')}
        error={errors.address?.message}
      />

      <SelectRole control={control} error={errors.roleId?.message} />

      <FileInput
        label="Photo"
        multiple={false}
        {...register('photo')}
        error={errors.photo?.message}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          register('photo').onChange({ target: { value: file } });
        }}
      />
    </>
  );
}
