'use client';

import PrintButton from '@/components/print-button';
import PageHeader from '@/shared/page-header';
import LogoImg from '@public/images/logo.png';
import Image from 'next/image';
import { useRef } from 'react';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useReactToPrint } from 'react-to-print';
import { Badge, Button, Text, Title } from 'rizzui';

const pageHeader = {
  title: 'Kasir',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Invoice',
    },
  ],
};

export default function Invoice() {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>

      <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
          <Image
            src={LogoImg}
            alt="Kasirku"
            width={180}
            height={180}
            priority
            className=""
          />
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color="success"
              rounded="md"
              className="mb-3 md:mb-2"
            >
              Paid
            </Badge>
            <Title as="h6">INV - #246098</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        {/* <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <Title as="h6" className="mb-3.5 font-semibold">
              From
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              REDQ, INC
            </Text>
            <Text className="mb-1.5">Jerome Bell</Text>
            <Text className="mb-1.5">
              4140 Parker Rd. Allentown, <br /> New Mexico 31134
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">(302) 555-0107</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
              <Text>Mar 22, 2013</Text>
            </div>
          </div>

          <div className="mt-4 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Bill To
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              TRANSPORT LLC
            </Text>
            <Text className="mb-1.5">Albert Flores</Text>
            <Text className="mb-1.5">
              2715 Ash Dr. San Jose, <br />
              South Dakota 83475
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">(671) 555-0110</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Due Date</Text>
              <Text>Mar 22, 2013</Text>
            </div>
          </div>
        </div> */}

        {/* <InvoiceDetailsListTable /> */}

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-4 pt-8 xs:flex-row">
          <div className="mt-6 max-w-md pe-4 xs:mt-0">
            <Title
              as="h6"
              className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
            >
              Notes
            </Title>
            <Text className="leading-[1.7]">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Text>
          </div>
          <div className="w-full max-w-sm">
            <Text className="flex items-center justify-between border-b border-muted pb-3.5 lg:pb-5">
              Subtotal:{' '}
              <Text as="span" className="font-semibold">
                $700
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Shipping:{' '}
              <Text as="span" className="font-semibold">
                $142
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Discount:{' '}
              <Text as="span" className="font-semibold">
                $250
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Taxes:
              <Text as="span" className="font-semibold">
                15%
              </Text>
            </Text>
            <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
              Total: <Text as="span">$659.5</Text>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

// function InvoiceDetailsListTable() {
//   return (
//     <Table
//       data={invoiceItems}
//       columns={columns}
//       variant="minimal"
//       rowKey={(record: any) => record.id}
//       scroll={{ x: 660 }}
//       className="mb-11"
//     />
//   );
// }
