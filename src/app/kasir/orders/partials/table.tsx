import Table from '@/components/ui/table';
import { columns } from './columns';

export default function TableOrders(props: any) {
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
