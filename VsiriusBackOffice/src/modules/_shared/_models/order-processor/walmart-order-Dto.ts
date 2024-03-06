export interface WalmartOrderDetailDTO {
    purchaseOrderId: string | null;
    customerOrderId: string | null;
    supplierOrderId: string | null;
    supplier: string | null;
    trackingNumber: string | null;
    carrierName: string | null;
    customerEmailId: string | null;
    isSubmitted: boolean | null;
    orderDate: string | null;
    estimatedDeliveryDate: string | null;
    estimatedShipDate: string | null;
    methodShipping: string | null;
    buyerName: string | null;
    address1: string | null;
    address2: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    items: WalmartItemDTO[] | null;
    isDelete: boolean;
}

export interface WalmartItemDTO {
    sku: string | null;
    productName: string | null;
    price: number | null;
    tax: number | null;
    quantity: string | null;
    orderStatus: string | null;
}

