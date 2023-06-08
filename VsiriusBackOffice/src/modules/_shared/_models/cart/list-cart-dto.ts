import { ListCartDetailsDto } from "./list-cart-detail-dto";

export interface ListCartDto {
    cartId: string | null;
    userId: string | null;
    userName: string | null;
    totalPrice: number | null;
    quantityItem: number;
    status: boolean | null;
    listCartDetailsDtos: ListCartDetailsDto[];
}