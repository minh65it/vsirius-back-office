import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/modules/_shared/_models/product';
import { VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ProductService } from 'src/modules/_shared/_services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  listFieldData: VsiriusFilter[] = [];
  listProductType: any[] = [];
  model: string = 'feed product type';
  productType: string = '';
  listFileds: VsiriusFilter[] = [];
  groupName: string[] = [];
  product: Product = <Product>{};
  feed_product_type: string = '';
  item_sku: string = '';
  constructor(private route: ActivatedRoute,
    private service: ProductService,
    private notiflix: NgxNotiflixService) { }

  ngOnInit() {
    this.item_sku = this.route.snapshot.params['id'];
    this.loadSourceParam();
    this.loadData();
  }

  loadSourceParam() {
    this.service.currentProductSource.subscribe({
      next: res => {
        this.feed_product_type = res.feed_product_type;
        this.loadDataTabView(this.feed_product_type);
        this.loadValueForAdd(this.feed_product_type)
      }
    })
  }

  loadValueForAdd(e) {
    this.notiflix.showLoading();
    this.service.getValueForAdd(e).subscribe({
      next: (res) => {
        this.listFieldData = res;
        console.log(this.listFieldData);
        this.notiflix.hideLoading();
      },
      error: (err) => {
        console.log(err);
        this.notiflix.hideLoading();
      }
    })
  }

  loadDataTabView(e) {
    this.notiflix.showLoading();
    this.service.getDataFilter(e).subscribe({
      next: (res) => {
        this.groupName = res.map(x => x.groupName);
        this.groupName = this.groupName.filter((item, index) => this.groupName.indexOf(item) === index);
        this.notiflix.hideLoading();
      },
      error: (err) => {
        console.log(err);
        this.notiflix.hideLoading();
      }
    })
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getDetail(this.item_sku).subscribe({
      next: res => {
        this.product = res;
        console.log(this.product);
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.hideLoading();
        this.notiflix.error('Error symtems');
      }
    })
  }

  listTabView(tab): any[] {
    return this.listFieldData.filter(x => x.groupName == tab);
  }

  onSelectedOptionChange(fieldName: any, value) {
    this.product[fieldName] = value;
    console.log(`${fieldName + ':' + value}`);
  }

  onInputValueChanged(value: any, fieldName) {
    this.product[fieldName] = value;
  }
  
  save() {
    this.notiflix.showLoading();
    this.service.update(this.product).subscribe({
      next: res => {
        res.success ? this.notiflix.success(res.message) :
          this.notiflix.error(res.message);
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error('');
        this.notiflix.hideLoading();
      }
    })
  }
  cancel() {

  }
}
