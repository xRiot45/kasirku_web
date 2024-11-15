export interface ICountData {
  products: number;
  users: number;
  reports: number;
  roles: number;
}

export interface ISaleData {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

export interface IOrderStatusData {
  order_dikonfirmasi: number;
  order_sedang_diproses: number;
  order_selesai: number;
  order_dibatalkan: number;
}

export interface ITotalProfit {
  total_profit: number;
}
