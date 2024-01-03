export interface SearchReturnParam {
    statusReturn: StatusReturn | null;
    customerName: string | null;
    purchaseOrderID: string | null;
    returnOrderID: string | null;
    sKU: string | null;
    fromDate: string | null;
    toDate: string | null;
}

export enum StatusReturn {
    INITIATED,
    DELIVERED,
    COMPLETED
}