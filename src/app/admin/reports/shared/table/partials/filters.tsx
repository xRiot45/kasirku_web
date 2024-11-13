'use client';

import { FilterDrawerView } from '@/components/controlled-table/table-filter';
import { DatePicker } from '@/components/ui/datepicker';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { PiFunnel } from 'react-icons/pi';
import { Button, Flex, Input } from 'rizzui';

type SearchProps = {
  reporting_date: string;
};

type TableToolbarProps<T extends Record<string, any>> = {
  table: ReactTableType<T>;
  search: SearchProps;
  onSearchChange: (newSearch: Partial<SearchProps>) => void;
};

export default function Filters<TData extends Record<string, any>>(
  props: TableToolbarProps<TData>
) {
  const { table, search, onSearchChange } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Products Filters"
        setOpenDrawer={setOpenDrawer}
      >
        <div className="grid grid-cols-1 gap-6">
          <DatePicker
            inputProps={{ label: 'Reporting Date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              const selectedDate = Array.isArray(date) ? date[0] : date;
              const newSearch = {
                reporting_date: selectedDate
                  ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
                  : '',
              };
              onSearchChange(newSearch);
            }}
            selected={
              search.reporting_date
                ? new Date(search.reporting_date.replace(/-/g, '/'))
                : null
            }
          />
        </div>
      </FilterDrawerView>

      <Flex align="center" gap="3" className="w-auto">
        <Button
          variant={'outline'}
          onClick={() => setOpenDrawer(!openDrawer)}
          className="h-9 pe-3 ps-2.5"
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          Filters
        </Button>
      </Flex>
    </div>
  );
}
