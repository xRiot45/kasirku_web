'use client';

import { FilterDrawerView } from '@/components/controlled-table/table-filter';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { PiFunnel } from 'react-icons/pi';
import { Button, Flex, Input } from 'rizzui';

type SearchProps = {
  product_name: string;
  product_code: string;
  product_status: string;
  product_category_name: string;
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
          <Input
            type="text"
            size="lg"
            label="Product Code"
            placeholder="Search product code..."
            className="w-full [&>label>span]:font-medium"
            inputClassName="text-sm"
            value={search.product_code}
            onChange={(e) => onSearchChange({ product_code: e.target.value })}
          />

          <Input
            type="text"
            size="lg"
            label="Product Name"
            placeholder="Search product name..."
            className="w-full [&>label>span]:font-medium"
            inputClassName="text-sm"
            value={search.product_name}
            onChange={(e) => onSearchChange({ product_name: e.target.value })}
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

// function FilterElements<T extends Record<string, any>>(
//   props: TableToolbarProps<T>
// ) {
//   const { search, onSearchChange } = props;
//   return (
//     <>
//       <Input
//         type="text"
//         size="lg"
//         label="Employee Number"
//         placeholder="Search employee number..."
//         className="w-full [&>label>span]:font-medium"
//         inputClassName="text-sm"
//         value={search.employee_number}
//         onChange={(e) => onSearchChange({ employee_number: e.target.value })}
//       />

//       <Input
//         type="text"
//         size="lg"
//         label="Full Name"
//         placeholder="Search full name..."
//         className="w-full [&>label>span]:font-medium"
//         inputClassName="text-sm"
//         value={search.full_name}
//         onChange={(e) => onSearchChange({ full_name: e.target.value })}
//       />

//       <Input
//         type="email"
//         size="lg"
//         label="Email"
//         placeholder="Search email..."
//         className="w-full [&>label>span]:font-medium"
//         inputClassName="text-sm"
//         value={search.email}
//         onChange={(e) => onSearchChange({ email: e.target.value })}
//       />
//     </>
//   );
// }
