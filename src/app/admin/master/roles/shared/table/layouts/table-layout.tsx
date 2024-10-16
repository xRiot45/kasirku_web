'use client';

import PageHeader, { PageHeaderTypes } from '@/shared/page-header';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';
import { Button, Flex } from 'rizzui';

type TableLayoutProps = {
  data?: unknown[];
  header?: string;
  fileName?: string;
} & PageHeaderTypes;

export default function TableLayout({
  data,
  header,
  fileName,
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <div className="mt-6">
      <PageHeader {...props}>
        <Flex
          direction="col"
          justify="end"
          className="mb-4 w-auto xs:flex-row xs:items-center"
        >
          <Link href={'/admin/master/roles/add-role'} replace={true}>
            <Button className="flex gap-3 py-6">
              <FaPlus />
              Add Role
            </Button>
          </Link>

          <Button className="flex gap-3 bg-green-600 py-6">
            <TfiReload />
            Refresh Page
          </Button>
        </Flex>
      </PageHeader>

      {children}
    </div>
  );
}
