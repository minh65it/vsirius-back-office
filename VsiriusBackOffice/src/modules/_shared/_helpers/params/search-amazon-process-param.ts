export interface AmazonProcessSearchParam {
    amazonOrderId: string | null;
    supplier: string | null;
    sKU: string | null;
    fromDate: string | null;
    toDate: string | null;
    addressLine1: string | null;
    buyerName: string | null;
    isSubmitted: boolean | null;
}