import Table from '@/components/ui/table';
import { columns } from './columns';
import { IOrders } from '@/services/orders/_models';
import { useMutationHooks } from '@/hooks/use-mutation';
import { deleteOrderById } from '@/services/orders/_requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function TableOrders(props: { data: IOrders[] }) {
  const { data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteOrderById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Delete order successfully!');
    },
    onError: () => {
      toast.error('An error occurred while deleting data, please try again!');
    },
  });

  const handleDeleteOrderById = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      <Table
        data={data}
        columns={columns(handleDeleteOrderById)}
        className="text-sm"
        variant="minimal"
        rowKey={(record) => record.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
