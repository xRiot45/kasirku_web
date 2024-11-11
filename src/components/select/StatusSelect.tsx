import { Control, Controller } from 'react-hook-form';
import { Select } from 'rizzui';

type SearchProps = {
  order_status?: string;
};

interface PropTypes {
  control: Control;
  onSearchChange: (newSearch: Partial<SearchProps>) => void;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
}

export default function SelectStatus(props: PropTypes) {
  const { control, onSearchChange, setOpenDrawer } = props;

  const statusOption = [
    { value: 'Order Dikonfirmasi', label: 'Order Dikonfirmasi' },
    { value: 'Order Sedang Diproses', label: 'Order Sedang Diproses' },
    { value: 'Order Selesai', label: 'Order Selesai' },
    { value: 'Order Dibatalkan', label: 'Order Dibatalkan' },
  ];

  return (
    <>
      <Controller
        name="order_status"
        control={control}
        render={({ field: { onChange, value } }) => {
          const handleChange = (selectedValue: any) => {
            onChange(selectedValue);
            onSearchChange({ order_status: selectedValue });
            setOpenDrawer(false);
          };

          return (
            <Select
              size="lg"
              label="Order Status"
              value={value}
              placeholder="--- Select Order Status ---"
              dropdownClassName="!z-0"
              options={statusOption}
              onChange={handleChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
