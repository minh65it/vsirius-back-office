export interface ClaimDto {
    documentType: string;
    marketplace: string | null;
    marketplaceOrderId: string | null;
    rMA: string | null;
    notes: string[];
    images: ImageInfo[];
    scanDate: string;
}
export interface ImageInfo {
    text: string;
    url: string;
}