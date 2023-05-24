import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/modules/_shared/_models/product';
import { VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ProductService } from 'src/modules/_shared/_services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedOption: any;
  listData: VsiriusFilter[] = [];
  listFieldData: VsiriusFilter[] = [];
  listProductType: any[] = [];
  model: string = 'feed product type';
  productType: string = '';
  listFileds: VsiriusFilter[] = [];
  groupName: string[] = [];
  activeIndex: number = 0;
  scrollableTabs: any[] = [];
  constructor(private service: ProductService,
    private router: Router,
    private notiflix: NgxNotiflixService) { }

  ngOnInit() {
    this.loadDataProductType();
  }

  loadDataProductType() {
    this.service.getDataFilter('').subscribe({
      next: (res) => {
        this.listProductType = res.map(x => x.value);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  filterProductType(e: string) {
    this.loadData(e);
    this.loadValueForAdd(e);
  }

  loadValueForAdd(e) {
    this.notiflix.showLoading();
    this.service.getValueForAdd(e).subscribe({
      next: (res) => {
        this.listFieldData = res.filter(x => x.value == null);
        this.notiflix.hideLoading();
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
        this.groupName = res.map(x => x.groupName);
        this.groupName = this.groupName.filter((item, index) => this.groupName.indexOf(item) === index);
        this.scrollableTabs = Array.from(
          { length: this.groupName.length }, 
          (_, i) => ({ title: this.groupName[i], content: `${this.groupName[i]}` }));
        this.notiflix.hideLoading();
      },
      error: (err) => {
        console.log(err);
        this.notiflix.hideLoading();
      }
    })
  }
  onSelectedOptionChange(value: any) {
    this.selectedOption = value;
    console.log('hello');
  }
}
