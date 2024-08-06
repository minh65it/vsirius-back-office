import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/modules/_shared/_models/product';
import { VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ProductService } from 'src/modules/_shared/_services/products/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  listData: VsiriusFilter[] = [];
  listFieldData: VsiriusFilter[] = [];
  listFieldDataSearch: VsiriusFilter[] = [];
  listProductType: any[] = [];
  model: string = 'feed product type';
  productType: string = 'Choose value...';
  listFileds: VsiriusFilter[] = [];
  groupName: string[] = [];
  product: Product = {} as Product;
  isFormValid: boolean = false;
  listExists: any[] = [];
  keyword: string = '';
  isSearchField: boolean = true;
  listFilter: VsiriusFilter[] = [];
  ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea,',
    forcePasteAsPlainText: true,
    removePlugins: 'exportpdf',
    language: 'en',
  }
  constructor(private service: ProductService,
    private router: Router,
    private notiflix: NgxNotiflixService) { }

  ngOnInit() {
    this.loadDataProductType();
  }

  loadDataProductType() {
    this.service.getDataFilter().subscribe({
      next: (res) => {
        console.log(res);
        
        this.listProductType = res.map(x => x.value);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  filterProductType(e: string) {  
    if(e != null) {
      this.loadData(e);
      this.loadValueForAdd(e);
      this.isSearchField = false;
      this.product.feed_product_type = e;
    } 
  }

  loadValueForAdd(e) {
    this.notiflix.showLoading();
    this.service.getValueForAdd(e).subscribe({
      next: (res) => {
        this.listFieldData = res;
        this.listFieldDataSearch = res;
        this.groupName = res.map(x => x.groupName);
        this.groupName = this.groupName.filter((item, index) => this.groupName.indexOf(item) === index);
        this.listFilter = this.listFieldDataSearch.filter(x=>x.groupName == 'Required')
                                        .filter(item => /1$/.test(item.fieldName));
        this.notiflix.hideLoading();
        console.log(this.groupName);
        console.log(res);
        
        
      },
      error: (err) => {
        console.log(err);
        this.notiflix.hideLoading();
      }
    })
  }

  loadData(e) {
    this.notiflix.showLoading();
    this.service.getDataFilter(e).subscribe({
      next: (res) => {
        this.listData = res;
        this.notiflix.hideLoading();
      },
      error: (err) => {
        console.log(err);
        this.notiflix.hideLoading();
      }
    })
  }
  listTabView(tab): any[] {
    return this.listFieldData.filter(x => x.groupName == tab);
  }

  onSelectedOptionChange(fieldName: any, value) {
    this.product[fieldName] = value;
  }

  onInputValueChanged(value: any, fieldName) {
    this.product[fieldName] = value;
  }

  searchField() {
    const filteredData = this.listFieldDataSearch.filter(x => x.fieldName.includes(this.keyword));
    this.listFieldData = [...filteredData];
  }

  add() {
    if (this.productType == '' || this.productType == null) {
      this.product.feed_product_type = this.listProductType[0];
    }
    this.notiflix.showLoading();
    this.service.create(this.product).subscribe({
      next: res => {
        if(res.success ){
          this.notiflix.success(res.message)
          this.cancel();
         }
         else{
          this.notiflix.error(res.message);
         }
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error('');
        this.notiflix.hideLoading();
      }
    })
  }
  clear() {
    this.product = <Product>{}
  }
  cancel() {
    this.router.navigate(['products/product']);
  }
}
