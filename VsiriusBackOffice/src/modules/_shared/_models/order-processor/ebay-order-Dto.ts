export interface EbayDto {
    orderId: string | null;
    customerId: string | null;
    customerName: string | null;
    customerPhone: string | null;
    customerEmail: string | null;
    address1: string | null;
    address2: string | null;
    trackingNo: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    totalPrice: number | null;
    statusOrder: string | null;
    orderDate: string | null;
    isSubmit: boolean;
    supplier: string | null;
    orderDetails: OrderDetail[];
}

interface OrderDetail {
    orderDetailId: string | null;
    orderId: string | null;
    sku: string | null;
    quantity: number | null;
    price: number | null;
}