export interface VsiriusHomeProduct {
    item_sku: string;
    item_name: string | null;
    isPopular: boolean | null;
    isLatest: boolean | null;
    isActive: boolean | null;
    isDelete: boolean | null;
    createdBy: string | null;
    createdDate: string | null;
    updatedBy: string | null;
    updatedDate: string | null;
}

export interface VsiriusHomeProductParams {
    filter: string;
    takeProduct: number;
}