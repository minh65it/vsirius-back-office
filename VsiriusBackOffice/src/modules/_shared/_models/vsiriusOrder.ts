export interface VsiriusOrder {
    orderId: string;
    cartId: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    birthDay: string | null;
    gender: boolean | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    postCode: number | null;
    country: string | null;
    shipping: boolean | null;
    paymentMethod: number | null;
    note: string | null;
    status: number | null;
    createOrderDate: string | null;
    totalQuantityItem: number | null;
    totalPrice: number | null;

    statusName:string
}