import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListCartDto } from '../../_models/cart/list-cart-dto';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { ListCartDetailsDto } from '../../_models/cart/list-cart-detail-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiCartURL + 'VsiriusCart/';

  constructor(private http: HttpClient) { }

  getListCartAll(pagination: PaginationParam, fullTextSearch: string) {
    const queryParams = {
      ...pagination,
      fullTextSearch,
    }
    return this.http.get<PaginationResult<ListCartDto>>(this.baseUrl + 'ListCartAll', { params: queryParams });
  }
  getCardDetailByCartId(cartId: string, isDelete: boolean) {
    const params = { cartId, isDelete };
    return this.http.get<ListCartDetailsDto[]>(this.baseUrl + 'GetCartDetailByCartId', { params: params });
  }
}
