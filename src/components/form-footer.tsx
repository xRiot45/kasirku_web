import { Button } from 'rizzui';
import cn from '../utils/class-names';
import { useRouter } from 'next/navigation';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  handleAltBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  className,
}: FormFooterProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-10 py-4 dark:bg-gray-50',
        className,
        negMargin
      )}
    >
      <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={() => router.back()}
      >
        {altBtnText}
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-amber-600 @xl:w-auto"
      >
        {submitBtnText}
      </Button>
    </div>
  );
}
