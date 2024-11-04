'use client';

import { Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface PropTypes {
  control: any;
  errors: any;
}

export default function SelectProductStatus(props: PropTypes) {
  const { control, errors } = props;
  const genderOptions = [
    {
      value: 'Tersedia',
      label: 'Tersedia',
    },
    {
      value: 'Tidak Tersedia',
      label: 'Tidak Tersedia',
    },
  ];

  return (
    <>
      <Controller
        name="product_status"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              size="lg"
              label="Product Status"
              value={value}
              error={errors}
              placeholder="--- Select Product Status ---"
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
