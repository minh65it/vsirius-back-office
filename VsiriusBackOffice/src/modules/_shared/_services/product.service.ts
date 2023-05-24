import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VsiriusFilter } from '../_models/vsirius-filter';
import { Product } from '../_models/product';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
import { OperationResult } from '../_helpers/operation-result';
import { FunctionUtility } from '../_helpers/function-utility';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiURL + 'VsiriusProduct';
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getProducts(filterParam: VsiriusFilter[], pagination: PaginationParam, keyWord: string) {
    const queryParams = {
      ...pagination,
      keyWord,
    }
    return this.http.post<PaginationResult<Product>>(this.baseUrl, filterParam, { params: queryParams });
  }

  getDataFilter(feed_product_type?: string) {
    return this.http.get<VsiriusFilter[]>(this.baseUrl + '/Filter', { params: { feed_product_type } });
  }

  getValueForAdd(feed_product_type?: string){
    return this.http.get<VsiriusFilter[]>(this.baseUrl + '/GetValueForAdd', { params: { feed_product_type } });
  }

  importData(fileExcel: File) {
    const formData = new FormData();
    formData.append('fileExcel', fileExcel, fileExcel.name);
    const headers = new HttpHeaders();
    // Thiết lập header 'Content-Type' là 'multipart/form-data'
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<OperationResult>(this.baseUrl + '/ImportExcel', formData, { headers });
  }

  delete(item_sku: string) {
    return this.http.delete<OperationResult>(this.baseUrl, { params: { item_sku } });
  }
}
