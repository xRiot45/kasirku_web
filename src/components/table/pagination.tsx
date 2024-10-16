import { type Table as ReactTableType } from '@tanstack/react-table';
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Select,
  SelectOption,
  Text,
} from 'rizzui';
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import { RoleRespone } from '@/app/admin/master/roles/core/_models';

interface PaginationProps<TData> {
  table: ReactTableType<TData>;
  showSelectedCount?: boolean;
  className?: string;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
}

const options = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

export default function TablePagination(props: PaginationProps<any>) {
  const {
    table,
    showSelectedCount = false,
    className,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = props;

  return (
    <Flex
      gap="6"
      align="center"
      justify="between"
      className={cn('@container', className)}
    >
      <Flex align="center" className="w-auto shrink-0">
        <Text className="hidden font-normal text-gray-600 @md:block">
          Rows per page
        </Text>
        <Select
          size="sm"
          variant="flat"
          options={options}
          className="w-12"
          value={table.getState().pagination.pageSize}
          onChange={(v: SelectOption) => {
            table.setPageSize(Number(v.value));
          }}
          suffixClassName="[&>svg]:size-3"
          selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
          optionClassName="font-medium text-xs px-2 justify-center"
        />
      </Flex>

      <Flex align="center" className="w-auto shrink-0">
        <Text className="block font-normal text-gray-600">
          Displaying {table.getRowCount()} of {totalItems} items
        </Text>
      </Flex>

      {showSelectedCount && (
        <Box className="hidden w-full @2xl:block">
          <Text>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Text>
        </Box>
      )}

      <Flex justify="end" align="center">
        <Text className="hidden font-normal text-gray-600 @3xl:block">
          Page {currentPage} of {totalPages}{' '}
        </Text>

        <Grid gap="2" columns="4">
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={() => table.setPageIndex(0)}
            disabled={!hasPreviousPage}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretDoubleLeftBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={() => table.setPageIndex(previousPage || 0)}
            disabled={!hasPreviousPage}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretLeftBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={() =>
              table.setPageIndex((pageIndex: number) => nextPage || pageIndex)
            }
            disabled={!hasNextPage}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretRightBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={() =>
              table.setPageIndex(totalPages !== undefined ? totalPages - 1 : 0)
            }
            disabled={!hasNextPage}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretDoubleRightBold className="size-3.5" />
          </ActionIcon>
        </Grid>
      </Flex>
    </Flex>
  );
}
