import WidgetCard from '@/components/cards/widget-card';
import { IOrderStatusData } from '@/services/charts/_models';
import cn from '@/utils/class-names';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Box, Text } from 'rizzui';

interface PropTypes {
  orderStatusData: IOrderStatusData | undefined;
  className?: string;
}

export default function OrderStatusCharts(props: PropTypes) {
  const { orderStatusData, className } = props;

  const totalOrders =
    (orderStatusData?.order_dikonfirmasi || 0) +
    (orderStatusData?.order_sedang_diproses || 0) +
    (orderStatusData?.order_selesai || 0) +
    (orderStatusData?.order_dibatalkan || 0);

  // Total yang belum selesai
  const unfinishedOrders =
    (orderStatusData?.order_dikonfirmasi || 0) +
    (orderStatusData?.order_sedang_diproses || 0) +
    (orderStatusData?.order_dibatalkan || 0);

  // Hitung persentase yang belum selesai
  const unfinishedPercentage =
    totalOrders > 0 ? (unfinishedOrders / totalOrders) * 100 : 0;

  const mappingData = [
    {
      name: 'Order Dikonfirmasi',
      percentage: orderStatusData?.order_dikonfirmasi || 0,
      color: '#2563eb',
      count: orderStatusData?.order_dikonfirmasi || 0,
    },
    {
      name: 'Order Sedang Diproses',
      percentage: orderStatusData?.order_sedang_diproses || 0,
      color: '#ca8a04',
      count: orderStatusData?.order_sedang_diproses || 0,
    },
    {
      name: 'Order Selesai',
      percentage: orderStatusData?.order_selesai || 0,
      color: '#16a34a',
      count: orderStatusData?.order_selesai || 0,
    },
    {
      name: 'Order Dibatalkan',
      percentage: orderStatusData?.order_dibatalkan || 0,
      color: '#dc2626',
      count: orderStatusData?.order_dibatalkan || 0,
    },
  ];

  return (
    <WidgetCard
      title="Order Status Charts"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
    >
      <Box className="relative h-60 w-full translate-y-6 @sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: 40,
              right: 10,
            }}
            className="relative focus:[&_.recharts-sector]:outline-none"
          >
            <Pie
              label
              data={mappingData}
              endAngle={-10}
              stroke="none"
              startAngle={190}
              paddingAngle={1}
              cornerRadius={12}
              dataKey="percentage"
              innerRadius={'85%'}
              outerRadius={'100%'}
            >
              {mappingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Box className="absolute bottom-20 start-1/2 -translate-x-1/2 text-center @sm:bottom-28">
          <Text className="text-2xl font-bold text-gray-800 @lg:text-4xl">
            {unfinishedPercentage.toFixed(2)}%
          </Text>
          <Text className="font-medium">Unfinished Orders</Text>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-8 text-center @sm:flex @sm:flex-wrap @sm:justify-center @sm:text-start">
        {mappingData.map((item) => (
          <Box key={item.name}>
            <Text
              className="block text-xl font-bold @xl:text-2xl"
              style={{ color: item.color }}
            >
              {item.count}
            </Text>
            <Text className="whitespace-nowrap">{item.name}</Text>
          </Box>
        ))}
      </Box>
    </WidgetCard>
  );
}
