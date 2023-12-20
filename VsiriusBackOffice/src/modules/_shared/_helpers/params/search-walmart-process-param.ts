export interface WalmartProcessSearchParam {
    purchaseOrderId: string | null;
    customerOrderId: string | null;
    qgoldOrderId: string | null;
    trackingNumber: string | null;
    buyerName: string | null;
    address1: string | null;
    orderStatus: WalmartOrderType | null;
    sKU: string | null;
    fromDate: string | null;
    toDate: string | null;
    isSubmitted: boolean | null;
}

export enum WalmartOrderType {
    Created,
    Acknowledged,
    Shipped,
    Delivered,
    Cancelled
}