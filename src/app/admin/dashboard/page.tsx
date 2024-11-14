'use client';

import MetricCard from '@/components/cards/metric-card';
import {
  getCountData,
  getCountOrderStatus,
  getCountSaleByYear,
} from '@/services/charts/_requests';
import PageHeader from '@/shared/page-header';
import cn from '@/utils/class-names';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AiFillProduct } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import { HiDocumentReport } from 'react-icons/hi';
import SaleCharts from './partials/sale-charts';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Box, Button, Flex } from 'rizzui';
import { TfiReload } from 'react-icons/tfi';
import OrderStatusCharts from './partials/order-status-charts';

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

  console.log(orderStatusData);

  const mappingCountData = [
    {
      id: 1,
      icon: <AiFillProduct className="h-full w-full" />,
      title: 'Total Products',
      metric: countData?.products,
    },
    {
      id: 2,
      icon: <FaUsers className="h-full w-full" />,
      title: 'Total Users',
      metric: countData?.users,
    },
    {
      id: 3,
      icon: <HiDocumentReport className="h-full w-full" />,
      title: 'Total Reports',
      metric: countData?.reports,
    },
    {
      id: 4,
      icon: <GrUserSettings className="h-full w-full" />,
      title: 'Total Roles',
      metric: countData?.roles,
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

      <div className={cn('mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4')}>
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
