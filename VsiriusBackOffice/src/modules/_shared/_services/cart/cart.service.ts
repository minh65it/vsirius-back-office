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
  baseUrl = environment.apiOrderURL + 'VsiriusCart/';
  clientId = environment.clientIdCart;
  clientSecret = environment.clientSecretCart;
  constructor(private http: HttpClient) { }

  getListCartAll(pagination: PaginationParam, fullTextSearch: string) {
    const queryParams = {
      ...pagination,
      fullTextSearch,
    }
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<PaginationResult<ListCartDto>>(this.baseUrl + 'ListCartAll', { params: queryParams, headers: { clientId, clientSecret } });
  }
  getCardDetailByCartId(cartId: string, isDelete: boolean) {
    const params = { cartId, isDelete };
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<ListCartDetailsDto[]>(this.baseUrl + 'GetCartDetailByCartId', { params: params, headers: { clientId, clientSecret } });
  }
}
