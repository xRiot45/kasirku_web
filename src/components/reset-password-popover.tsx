import { MdOutlineLockReset } from 'react-icons/md';
import { ActionIcon, Button, Popover, Text, Title } from 'rizzui';
import { IoIosWarning } from 'react-icons/io';

type DeletePopoverProps = {
  title: string;
  description: string;
  onResetPassword?: () => void;
};

export default function ResetPasswordPopover({
  title,
  description,
  onResetPassword,
}: DeletePopoverProps) {
  return (
    <Popover placement="left">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer"
        >
          <MdOutlineLockReset className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-10">
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <IoIosWarning className="h-4 w-4 me-2" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={() => {
                  onResetPassword && onResetPassword();
                  setOpen(false);
                }}
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
