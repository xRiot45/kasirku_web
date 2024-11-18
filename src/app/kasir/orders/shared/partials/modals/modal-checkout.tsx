import { Form } from '@/components/ui/form';
import { ActionIcon, Button, Input, Modal, Title } from 'rizzui';
import { validationSchema } from '../validationSchema';
import { IoMdClose } from 'react-icons/io';
import { ICheckoutOrdersRequest } from '@/services/checkouts/_models';
import { SubmitHandler } from 'react-hook-form';

interface PropTypes {
  modalCheckoutState: boolean;
  setModalCheckoutState: (state: boolean) => void;
  handleCheckoutOrders: SubmitHandler<{
    payment_amount: number;
    seat_number: string;
  }>;
}

export default function ModalCheckout(props: PropTypes) {
  const { modalCheckoutState, setModalCheckoutState, handleCheckoutOrders } =
    props;

  return (
    <>
      <Modal
        isOpen={modalCheckoutState}
        onClose={() => setModalCheckoutState(false)}
      >
        <Form
          validationSchema={validationSchema}
          onSubmit={handleCheckoutOrders}
        >
          {({ register, formState: { errors } }) => (
            <div className="m-auto px-7 pb-8 pt-6">
              <div className="mb-7 flex items-center justify-between">
                <Title as="h5" className="font-semibold">
                  Checkout Orders
                </Title>
                <ActionIcon
                  size="sm"
                  variant="text"
                  onClick={() => setModalCheckoutState(false)}
                >
                  <IoMdClose className="h-auto w-6" strokeWidth={1.8} />
                </ActionIcon>
              </div>
              <div>
                <Input
                  type="number"
                  size="lg"
                  label="Payment Amount *"
                  placeholder="Input payment amount..."
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('payment_amount', {
                    setValueAs: (value) => parseFloat(value) || 0, // Mengonversi string ke angka
                  })}
                  error={errors.payment_amount?.message}
                />

                <Input
                  type="text"
                  size="lg"
                  label="Seat Number *"
                  placeholder="Input seat number..."
                  className="mt-3 [&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('seat_number')}
                  error={errors.seat_number?.message}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="col-span-2 mt-5 w-full"
                >
                  Checkout Orders
                </Button>
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
}
