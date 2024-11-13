'use client';

import PageHeader, { PageHeaderTypes } from '@/shared/page-header';
import { TfiReload } from 'react-icons/tfi';
import { Button, Flex } from 'rizzui';

type TableLayoutProps = {
  data?: unknown[];
  header?: string;
  fileName?: string;
  refresh?: () => void;
} & PageHeaderTypes;

export default function TableLayout({
  data,
  header,
  fileName,
  children,
  refresh,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <div className="mt-6">
      <PageHeader {...props} className="flex flex-col @md:flex-row">
        <Flex
          direction="col"
          justify="end"
          className="my-4 w-full xs:items-center md:w-auto md:flex-row"
        >
          {/* <Link
            href={routes.products.addProduct}
            replace={true}
            className="w-full md:w-auto"
          >
            <Button className="flex w-full gap-3 py-6 md:w-auto">
              <FaPlus />
              Add Product
            </Button>
          </Link> */}

          <Button
            onClick={refresh}
            className="flex w-full gap-3 bg-green-600 py-6 hover:bg-green-700 md:w-auto"
          >
            <TfiReload />
            Refresh Page
          </Button>
        </Flex>
      </PageHeader>

      {children}
    </div>
  );
}
