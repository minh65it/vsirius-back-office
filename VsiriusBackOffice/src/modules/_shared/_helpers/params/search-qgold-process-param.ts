export interface SearchQgoldProcessParam {
    orderQgoldId: string | null;
    orderStatus: OrderQgoldStatus | null;
    fromDate: string | null;
    toDate: string | null;
    buyerName: string | null;
    style: string | null;
    marketplace: string | null;
    marketOrderId: string | null;
}

export enum OrderQgoldStatus {
    Invoiced,
    Cancelled,
    Backordered,
    Hold,
    Pending,
    Other
}