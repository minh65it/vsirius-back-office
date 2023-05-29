import { Component, OnInit } from '@angular/core';
import { VsiriusHomeProduct } from 'src/modules/_shared/_models/vsiriusHomeProduct';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ProductHomeService } from 'src/modules/_shared/_services/products/product-home.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  listProductsHome: VsiriusHomeProduct[] = []; 
  customFilter = 'product-custom';
  model:VsiriusHomeProduct = <VsiriusHomeProduct>{

  };
  constructor(
    private productHomeService:ProductHomeService,
    private notiflix: NgxNotiflixService) {

  }
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.notiflix.showLoading();
    this.productHomeService.getData().subscribe({
      next:res=>{
        this.listProductsHome = res;
        this.notiflix.hideLoading();
      },
      error:()=>{
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  
 update(home:VsiriusHomeProduct,isLatestOrPopular){
  const index = this.listProductsHome.findIndex(x=>x.item_sku == home.item_sku);
  if(isLatestOrPopular == 1){
    this.model = <VsiriusHomeProduct>{
      isActive:true,
      item_name:home.item_name,
      isPopular:!this.listProductsHome[index].isPopular,
      isLatest: this.listProductsHome[index].isLatest,
      item_sku:home.item_sku,
    }
  }
  else{
    this.model = <VsiriusHomeProduct>{
      isActive:true,
      item_name:home.item_name,
      isPopular:this.listProductsHome[index].isPopular,
      isLatest: !this.listProductsHome[index].isLatest,
      item_sku:home.item_sku,
    }
  }
  this.notiflix.showLoading();
  this.productHomeService.createOrUpdate(this.model).subscribe({
    next: res => {
      res.success ? this.notiflix.success(res.message) : this.notiflix.error(res.message);
      this.loadData();
      this.notiflix.hideLoading();
    },
    error: () => {
      this.notiflix.error('Error System');
      this.notiflix.hideLoading();
    }
  })
 }

 delete(home:VsiriusHomeProduct){
  this.notiflix.confirm('Message', 'Do you want delete product in home?', () => {
    this.notiflix.showLoading();
    this.productHomeService.delete(home.item_sku).subscribe({
      next: res => {
        res.success ? this.notiflix.success(res.message) :
          this.notiflix.error(res.message);
        this.loadData();
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error(err);
        this.notiflix.hideLoading();
      }
    })
  })
 }
}
