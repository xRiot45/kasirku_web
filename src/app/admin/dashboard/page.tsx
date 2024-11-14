'use client';

import MetricCard from '@/components/cards/metric-card';
import { getCountData, getCountSaleByYear } from '@/services/charts/_requests';
import PageHeader from '@/shared/page-header';
import cn from '@/utils/class-names';
import { useQuery } from '@tanstack/react-query';
import { AiFillProduct } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import { HiDocumentReport } from 'react-icons/hi';
import SaleCharts from './partials/sale-charts';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
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

      <SaleCharts saleData={saleData} handleSearchChange={handleSearchChange} />
    </>
  );
}
