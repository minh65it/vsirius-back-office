export interface QgoldOrderDTO {
    orderQgoldId: string | null;
    orderStatus: string | null;
    orderDate: string | null;
    buyerName: string | null;
    address1: string | null;
    zipCode: string | null;
    tracking: string | null;
    shipVia: string | null;
    items: ItemQgold[] | null;
    total: string | null;
    marketplace: string | null;
    marketOrderId: string | null;
    isDelete: boolean;
}

export interface QgoldOrderDetailDTO {
    orderQgoldId: string | null;
    pOQgold: string | null;
    status: string | null;
    location: string | null;
    date: string | null;
    total: string | null;
    shipToText: string | null;
    shipToAddress1: string | null;
    zipCode: string | null;
    soldToText: string | null;
    soldToAddress1: string | null;
    soldToAddress2: string | null;
    documentType: string | null;
    placedBy: string | null;
    placedVia: string | null;
    shipVia: string | null;
    packagingOption: string | null;
    tracking: string | null;
    dueDate: string | null;
    term: string | null;
    shipViaCode: string | null;
    shipOptionCode: string | null;
    marketplace: string | null;
    marketOrderId: string | null;
    shipToPhone: string | null;
    items: ItemQgold[] | null;
}

export interface ItemQgold {
    style: string;
    itemDesc: string;
    qty: string;
    uOM: string;
    price: string;
    itemTotal: string;
    invoice: string;
}