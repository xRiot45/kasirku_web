import api from '@/config/api';
import { IReports } from './_model';

const CREATE_REPORTS = `${process.env.API_URL}/api/reports/create`;
const GET_REPORTS = `${process.env.API_URL}/api/reports/all`;
const GET_REPORT_BY_ID = `${process.env.API_URL}/api/reports/show`;

export async function createReports(): Promise<IBaseResponse<IReports[]>> {
  const res = await api.post(CREATE_REPORTS);
  return res.data.data;
}

export async function getAllReports(
  search: {
    reporting_date?: string;
  },
  page: number = 1,
  limit?: number
): Promise<IBaseResponse<IReports[]>> {
  const actualLimit = limit ?? 10;
  const res = await api.get(GET_REPORTS, {
    params: {
      ...search,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function getReportById(id: string): Promise<IReports> {
  const res = await api.get(`${GET_REPORT_BY_ID}/${id}`);
  return res.data.data;
}
