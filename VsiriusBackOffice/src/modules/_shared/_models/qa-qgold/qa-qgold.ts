export interface QgoldQADTO {
    _id: string;
    title: string | null;
    description: string;
    customerEmail: string | null;
    customerPhone: string | null;
    customerName: string | null;
    orderQgoldId: string | null;
    sKU: string | null;
    status: string | null;
    location: string | null;
    dateOrder: string | null;
    customerAddress1: string | null;
    zipCode: string | null;
    shipVia: string | null;
    tracking: string | null;
    marketplace: string | null;
    marketOrderId: string | null;
    isSent: boolean | null;
    cCEmail1: string | null;
    cCEmail2: string | null;
    files: FilesInfo[];
    date: string | null;
}

export interface FilesInfo {
    text: string;
    url: string;
}

export interface SearchQgoldQAParam {
    title: string | null;
    description: string | null;
    sKU: string | null;
    customerEmail: string | null;
    customerPhone: string | null;
    customerName: string | null;
    marketplace: string | null;
    marketOrderId: string | null;
}