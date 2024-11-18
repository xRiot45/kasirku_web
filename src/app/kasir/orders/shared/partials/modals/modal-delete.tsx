import { Button, Flex, Modal, Text, Title } from 'rizzui';
import DeleteImage from '@public/images/delete.png';
import Image from 'next/image';

interface PropTypes {
  modalDeleteState: boolean;
  setModalDeleteState: (state: boolean) => void;
  handleDeleteAllOrders: () => void;
}

export default function ModalDelete(props: PropTypes) {
  const { modalDeleteState, setModalDeleteState, handleDeleteAllOrders } =
    props;

  return (
    <>
      <Modal
        isOpen={modalDeleteState}
        onClose={() => setModalDeleteState(false)}
      >
        <div className="m-auto px-8 pb-8 pt-6">
          <Image
            src={DeleteImage}
            alt="Late Img"
            className="aspect-[632/630] w-auto"
          />

          <div className="mt-6">
            <Title className="text-center text-2xl font-bold">
              Are You Sure?
            </Title>
            <Text as="p" className="mt-2 text-center leading-6 text-gray-500">
              Want to delete all orders? This action cannot be undone. Please
              confirm if you are sure about removing all the data permanently.
            </Text>

            <Flex justify="between" align="center" className="mt-10">
              <Button
                variant="solid"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteAllOrders}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                className="w-full border border-amber-600 text-amber-600"
                onClick={() => setModalDeleteState(false)}
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
