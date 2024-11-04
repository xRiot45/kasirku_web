import Table from '@/components/ui/table';
import { columns } from './columns';
import { IOrders } from '@/services/orders/_models';

export default function TableOrders(props: { data: IOrders[] }) {
  const { data } = props;
  return (
    <>
      <Table
        data={data}
        columns={columns}
        className="text-sm"
        variant="minimal"
        rowKey={(record) => record.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
