import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VsiriusFilter } from '../_models/vsirius-filter';
import { Product } from '../_models/product';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiURL + 'VsiriusProduct';
  constructor(private http: HttpClient,) { }

  getProducts(filterParam: VsiriusFilter[], pagination: PaginationParam, keyWord: string) {
    const queryParams = {
      ...pagination,
      keyWord,
      ...filterParam.reduce((acc, fp) => ({ ...acc, [fp.fieldName]: fp.value }), {})
    };
    return this.http.get<PaginationResult<Product>>(this.baseUrl, { params: queryParams });
  }

  getDataFilter(feed_product_type?: string) {
    return this.http.get<VsiriusFilter[]>(this.baseUrl + '/Filter', { params: { feed_product_type } });
  }

}
