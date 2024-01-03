export interface ClaimSearchParam {
    documentType: DocumentType | null;
    marketplace: string | null;
    marketplaceOrderId: string | null;
    rMA: string | null;
}
export enum DocumentType {
    ReturnPackage,
    OrderDocuments,
    ShippedPackage
}