'use client';

import MetricCard from '@/components/cards/metric-card';
import { useDebounce } from '@/hooks/use-debounce';
import {
  getCountData,
  getCountOrderStatus,
  getCountSaleByYear,
  getCountTotalProfit,
} from '@/services/charts/_requests';
import PageHeader from '@/shared/page-header';
import cn from '@/utils/class-names';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiFillProduct } from 'react-icons/ai';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { TfiReload } from 'react-icons/tfi';
import { Button } from 'rizzui';
import OrderStatusCharts from './partials/order-status-charts';
import SaleCharts from './partials/sale-charts';

const pageHeader = {
  title: 'Dashboard',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Dashboard',
    },
  ],
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState({
    year: '',
  });

  const debounceSearch = useDebounce(search, 1000);
  const filteredSearch = Object.fromEntries(
    Object.entries(debounceSearch).filter(([_, value]) => value !== '')
  );

  const searchParams = filteredSearch as { year: string };

  const handleSearchChange = (
    partialSearch: Partial<{
      year: string;
    }>
  ) => {
    setSearch((prevSearch) => ({ ...prevSearch, ...partialSearch }));
  };

  const { data: countData } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getCountData(),
  });

  const { data: saleData } = useQuery({
    queryKey: ['charts', searchParams],
    queryFn: () => getCountSaleByYear(searchParams),
  });

  const { data: orderStatusData } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getCountOrderStatus(),
  });

  const { data: totalProfit } = useQuery({
    queryKey: ['total-profit'],
    queryFn: () => getCountTotalProfit(),
  });

  const mappingCountData = [
    {
      id: 1,
      icon: <AiFillProduct className="mr-2 h-full w-full" />,
      title: 'Total Products',
      metric: countData?.products,
    },
    {
      id: 2,
      icon: <FaUsers className="mr-2 h-full w-full" />,
      title: 'Total Users',
      metric: countData?.users,
    },
    {
      id: 3,
      icon: <HiDocumentReport className="mr-2 h-full w-full" />,
      title: 'Total Reports',
      metric: countData?.reports,
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="mr-2 h-full w-full" />,
      title: 'Total Revenue',
      metric: formatToRupiah(totalProfit?.total_profit ?? 0),
    },
  ];

  const handleRefresh = () => {
    setSearch({ year: '' });
    queryClient.invalidateQueries({ queryKey: ['charts'] });
  };

  return (
    <>
      <div className="">
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <Button
            onClick={handleRefresh}
            className="mt-3 flex w-full gap-3 bg-green-600 py-6 hover:bg-green-700 md:w-auto lg:mt-0"
          >
            <TfiReload />
            Refresh Page
          </Button>
        </PageHeader>
      </div>

      <div className={cn('mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4')}>
        {mappingCountData?.map((item) => (
          <MetricCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            metric={item.metric}
          />
        ))}
      </div>

      <SaleCharts
        saleData={saleData}
        handleSearchChange={handleSearchChange}
        className="mb-8"
      />

      <OrderStatusCharts orderStatusData={orderStatusData} />
    </>
  );
}
