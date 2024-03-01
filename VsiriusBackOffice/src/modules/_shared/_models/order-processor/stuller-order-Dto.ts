export interface StullerOrderDTO {
    orderID: string | null;
    confirmation: string | null;
    pO: string | null;
    orderDate: string | null;
    status: string | null;
    account: string | null;
    estTotalPrice: string | null;
    urlDetail: string | null;
    invoice: string | null;
    shipDate: string | null;
    deliveryDate: string | null;
    carrier: string | null;
    tracking: string | null;
    shippingUpdates: string | null;
    invoiceAmount: string | null;
    items: ItemStuller[];
    shipping: string | null;
    billing: string | null;
    zipCode: string | null;
    address1: string | null;
    buyerName: string | null;
    shippingMethod: string | null;
    marketplace: string | null;
    marketplaceOrderId: string | null;
}

export interface ItemStuller {
    productSku: string;
    ordered: string;
    shipped: string;
    estShipDate: string;
    unitPrice: string;
    estPrice: string;
}