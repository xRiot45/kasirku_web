'use client';

import { FilterDrawerView } from '@/components/controlled-table/table-filter';
import SelectStatus from '@/components/select/StatusSelect';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiFunnel } from 'react-icons/pi';
import { Button, Flex } from 'rizzui';

type SearchProps = {
  order_status: string;
};

interface TableToolbarProps<T extends Record<string, any>> {
  table?: ReactTableType<T>;
  onSearchChange: (newSearch: Partial<SearchProps>) => void;
}

export default function Filters<TData extends Record<string, any>>(
  props: TableToolbarProps<TData>
) {
  const { onSearchChange } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const { control } = useForm();

  return (
    <div className="mb-4">
      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Table Filters"
        setOpenDrawer={setOpenDrawer}
      >
        <SelectStatus
          control={control}
          onSearchChange={onSearchChange}
          setOpenDrawer={setOpenDrawer}
        />
      </FilterDrawerView>

      <Button
        variant={'outline'}
        onClick={() => setOpenDrawer(!openDrawer)}
        className="h-9 pe-3 ps-2.5"
      >
        <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
        Filters
      </Button>
    </div>
  );
}
