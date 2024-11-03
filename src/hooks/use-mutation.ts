import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useMutationHooks = (
  actionFn: (id: string) => Promise<any>,
  successMessage: string,
  errorMessage: string,
  routerPush?: string
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: actionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkouts'] });
      toast.success(successMessage);
      if (routerPush) {
        router.push(routerPush);
      }
    },
    onError: () => {
      toast.error(errorMessage);
    },
  });
};
