'use client';

import PageHeader, { PageHeaderTypes } from '@/shared/page-header';
import { useState } from 'react';
import { TbReportAnalytics } from 'react-icons/tb';
import { TfiReload } from 'react-icons/tfi';
import { Button, Flex, Modal, Text } from 'rizzui';
import ReportsImage from '@public/images/reports.png';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReports } from '@/services/reports/_requests';
import toast from 'react-hot-toast';

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
  const [modalState, setModalState] = useState<boolean>(false);

  return (
    <div className="mt-6">
      <PageHeader {...props} className="flex flex-col @md:flex-row">
        <Flex
          direction="col"
          justify="end"
          className="my-4 w-full xs:items-center md:w-auto md:flex-row"
        >
          <Button
            onClick={() => setModalState(true)}
            className="flex w-full gap-3 bg-amber-600 py-6 hover:bg-amber-700 md:w-auto"
          >
            <TbReportAnalytics />
            Create Reports
          </Button>
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

      <ModalConfirmation
        modalState={modalState}
        setModalState={setModalState}
      />
    </div>
  );
}

function ModalConfirmation({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createReports(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkouts'] }).then(() => {
        queryClient.refetchQueries({ queryKey: ['checkouts'] });
      });
      toast.success('Create reports successfully!');
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response?.status === 404) {
        toast.error('No checkouts data found!');
      } else {
        toast.error(
          'An error occurred while create reports, please try again!'
        );
      }
    },
  });

  const onSubmit = () => {
    mutation.mutate();
    setModalState(false);
  };

  return (
    <>
      <Modal isOpen={modalState} onClose={() => setModalState(false)} size="lg">
        <div className="m-auto px-8 pb-8 pt-6">
          <Image
            src={ReportsImage}
            alt="Late Img"
            className="aspect-[632/630] w-auto"
          />

          <div className="mt-6">
            <Text className="text-center text-2xl font-bold">
              Are You Sure?
            </Text>
            <Text as="p" className="mt-2 leading-6 text-gray-500">
              Before proceeding, please confirm if you are sure about creating
              the report. Once you submit, the report will be generated with the
              current data, and it cannot be undone. Make sure all details are
              correct before continuing. If you wish to make any changes, please
              go back and adjust the information accordingly.
            </Text>
            <Flex justify="between" align="center" className="mt-10">
              <Button
                variant="solid"
                className="w-full bg-amber-600 text-white"
                onClick={onSubmit}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                className="w-full border border-amber-600 text-amber-600"
                onClick={() => setModalState(false)}
              >
                Cancel
              </Button>
            </Flex>
          </div>
        </div>
      </Modal>
    </>
  );
}
