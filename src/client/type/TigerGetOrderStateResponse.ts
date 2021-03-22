export type TigerGetOrderStateResponse = {
  OrderID: string;
  Reason: number;
  State: string; // Pending; New; InProduction; Finished
};
