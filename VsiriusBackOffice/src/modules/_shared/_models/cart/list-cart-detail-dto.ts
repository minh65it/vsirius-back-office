export interface ListCartDetailsDto {
    cartDetailsId: string | null;
    productId: string | null;
    quantity: number | null;
    createDate: string | null;
    infoBrowser: string | null;
    productName: string;
    image: string | null;
    price: number | null;
    priceSale: number | null;
    size: string | null;
    color: string | null;
}