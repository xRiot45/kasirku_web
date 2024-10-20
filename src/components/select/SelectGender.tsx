'use client';

import { Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface PropTypes {
  control: any;
  error: any;
}

export default function SelectGender(props: PropTypes) {
  const { control, error } = props;
  const genderOptions = [
    {
      value: 'Laki-laki',
      label: 'Laki-laki',
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
              label="Gender"
              value={value}
              error={error}
              placeholder="--- Select Gender ---"
              dropdownClassName="!z-0"
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
