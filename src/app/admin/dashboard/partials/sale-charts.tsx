import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { DatePicker } from '@/components/ui/datepicker';
import { formatToRupiah } from '@/utils/formatRupiah';
import { useEffect, useState } from 'react';
import useMedia from 'react-use/lib/useMedia';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  LabelList,
} from 'recharts';
import { Badge } from 'rizzui';
import SimpleBar from 'simplebar-react';

function convertApiData(apiData: { [x: string]: any }) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames.map((month, index) => ({
    month,
    revenue: apiData[month.toLowerCase()] || 0,
  }));
}

export default function SaleCharts(props: any) {
  const { saleData, handleSearchChange } = props;
  const [data, setData] = useState<{ month: string; revenue: number }[]>([]);
  const isTablet = useMedia('(max-width: 820px)', false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDatePickerChange = (date: Date) => {
    setStartDate(date);
    handleSearchChange({ year: date.getFullYear().toString() });
  };

  useEffect(() => {
    if (saleData) {
      const convertedData = convertApiData(saleData);
      setData(convertedData);
    }
  }, [saleData]);

  return (
    <>
      <WidgetCard
        title={'Sale Charts'}
        description={
          <>
            <Badge renderAsDot className="me-0.5 bg-amber-600" /> Revenue
          </>
        }
        descriptionClassName="text-gray-500 mt-1.5"
        action={
          <DatePicker
            selected={startDate}
            onChange={handleDatePickerChange}
            dateFormat="yyyy"
            placeholderText="Select Year"
            showYearPicker
            inputProps={{
              variant: 'text',
              inputClassName: 'h-auto',
            }}
            popperPlacement="bottom-end"
            className="w-[150px] cursor-pointer"
          />
        }
      >
        <SimpleBar>
          <div className="h-96 w-full pt-9">
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '700px' })}
            >
              <ComposedChart
                data={data}
                barSize={isTablet ? 20 : 24}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <defs>
                  <linearGradient id="salesReport" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#F0F1FF"
                      className="[stop-opacity:0.1]"
                    />
                    <stop offset="95%" stopColor="#8200E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis dataKey="month" axisLine={true} tickLine={true} />
                <YAxis
                  axisLine={true}
                  tickLine={true}
                  tick={<CustomYAxisTick prefix={'Rp.'} />}
                  className="text-[10px]"
                />
                <Tooltip
                  labelFormatter={(value: string) => value}
                  content={
                    <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="#d97706"
                  stackId="a"
                  radius={[0, 0, 4, 4]}
                >
                  <LabelList
                    dataKey="revenue"
                    position="top"
                    className="mt-5"
                    formatter={(value: number) => formatToRupiah(value)}
                  />
                </Bar>
                <Area
                  type="bump"
                  dataKey="revenue"
                  stroke="#fcd34d"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesReport)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </WidgetCard>
    </>
  );
}
