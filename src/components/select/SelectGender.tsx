'use client';

import { Control, Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface PropTypes {
  control: Control;
  errors: any;
  label?: string;
}

export default function SelectGender(props: PropTypes) {
  const { control, errors, label } = props;
  const genderOptions = [
    {
      value: 'Laki-Laki',
      label: 'Laki-Laki',
    },
    {
      value: 'Perempuan',
      label: 'Perempuan',
    },
  ];

  return (
    <>
      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              size="lg"
              label={label}
              value={value}
              error={errors}
              placeholder="--- Select Gender ---"
              dropdownClassName="!z-0"
              className="col-span-full"
              options={genderOptions}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
