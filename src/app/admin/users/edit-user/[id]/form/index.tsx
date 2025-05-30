import SelectGender from '@/components/select/SelectGender';
import SelectRole from '@/components/select/SelectRole';
import { DatePicker } from '@/ui/datepicker';
import Image from 'next/image';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { FileInput, Input } from 'rizzui';
import { ValidationSchema } from './validationSchema';

interface PropTypes {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  control: Control<ValidationSchema>;
  selectedPhoto: string | null;
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors, control, selectedPhoto, handlePhotoChange } = props;

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
            inputProps={{ label: 'Birthday Date' }}
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

      <SelectGender
        label="Gender"
        control={control as unknown as Control<FieldValues>}
        errors={errors.gender?.message ?? ''}
      />

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

      <SelectRole
        control={control as unknown as Control<FieldValues>}
        errors={errors.roleId?.message ?? ''}
      />

      <FileInput
        label="Photo"
        multiple={false}
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
    </>
  );
}
