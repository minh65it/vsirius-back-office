export interface EbayDto {
    OrderId: string | null;
    CustomerId: string | null;
    CustomerName: string | null;
    CustomerPhone: string | null;
    CustomerEmail: string | null;
    Address1: string | null;
    Address2: string | null;
    TrackingNo: string | null;
    City: string | null;
    State: string | null;
    Country: string | null;
    ZipCode: string | null;
    TotalPrice: number | null;
    StatusOrder: string | null;
    OrderDate: string | null;
    IsSubmit: boolean;
    Supplier: string | null;
    OrderDetails: OrderDetail[];
}

interface OrderDetail {
    OrderDetailId: string | null;
    OrderId: string | null;
    Sku: string | null;
    Quantity: number | null;
    Price: number | null;
}