export interface SearchOrderStullerParam {
    orderID: string | null;
    fromDate: string | null;
    toDate: string | null;
    sKU: string | null;
    status: string | null;
    buyerName: string | null;
    marketplace: string | null;
    marketplaceOrderId: string | null;
}

export enum OrderStullerStatus {
    Shipped,
    Other
}