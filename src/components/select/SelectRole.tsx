import { IRole } from '@/services/roles/_models';
import { getAllRoles } from '@/services/roles/_requests';
import { useQuery } from '@tanstack/react-query';
import { Control, Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface PropTypes {
  control: Control;
  errors: string;
}

export default function SelectRole(props: PropTypes) {
  const { control, errors } = props;
  const currentPage = 1;
  const limit = 10;

  const { data: roleQueryResponse } = useQuery({
    queryKey: ['roles', currentPage, limit],
    queryFn: () => getAllRoles(currentPage, limit),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: rolesData } = roleQueryResponse || {};
  const rolesList = rolesData || [];

  const optionRole = rolesList.map((item: IRole) => ({
    value: item.id,
    label: item.role_name,
  }));

  const findSelectedOption = (value: string) => {
    return optionRole.find((option) => option.value === value);
  };

  return (
    <>
      <Controller
        name="roleId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Role"
              value={selectedOption || null}
              error={errors}
              placeholder="--- Select Role ---"
              dropdownClassName="!z-0"
              options={optionRole}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
