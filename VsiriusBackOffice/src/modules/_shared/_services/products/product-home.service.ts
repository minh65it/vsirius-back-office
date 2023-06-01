import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VsiriusHomeProduct } from '../../_models/vsiriusHomeProduct';
import { HttpClient } from '@angular/common/http';
import { OperationResult } from '../../_helpers/operation-result';

@Injectable({
  providedIn: 'root'
})
export class ProductHomeService {
  baseUrl = environment.apiProductURL + 'VsiriusHomeProduct';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<VsiriusHomeProduct[]>(this.baseUrl + '/GetAllHomeProductBackend');
  }

  createOrUpdate(product: VsiriusHomeProduct) {
    return this.http.post<OperationResult>(this.baseUrl, product);
  }

  delete(item_sku: string) {
    return this.http.delete<OperationResult>(this.baseUrl, { params: { item_sku } });
  }
}
