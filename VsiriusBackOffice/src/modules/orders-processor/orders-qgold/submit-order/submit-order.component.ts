import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QgoldFtpOrderItem, QgoldFtpOrderObject } from 'src/modules/_shared/_models/order-processor/qgold-ftp-order-object';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.scss']
})
export class SubmitOrderComponent implements OnInit {

  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  qgoldFtpOrderObject: QgoldFtpOrderObject = {} as QgoldFtpOrderObject;
  listItemQgold: QgoldFtpOrderItem[] = [];
  constructor(
    private router: Router,
    private service: OrdersQgoldService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.listItemQgold.push({} as QgoldFtpOrderItem);
    this.qgoldFtpOrderObject.item = []
    this.loadData();
  }
  loadData() {
    this.service.currentReSubmitOrder.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          //this.cancel();
        } else {
          this.qgoldFtpOrderObject = res;
          this.listItemQgold = [];
          this.listItemQgold = res.item;
        }
      }
    })
  }

  submitOrder() {
    this.qgoldFtpOrderObject.item = this.listItemQgold;
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      let dataSubmit: QgoldFtpOrderObject[] = [];
      dataSubmit.push(this.qgoldFtpOrderObject);
      // this.service.submitOrder(dataSubmit).subscribe({
      //   next: res => {
      //     if (!res.success) {
      //       this.notiflix.error(res.message);
      //       this.notiflix.hideLoading();
      //       return;
      //     }
      //     this.notiflix.success(res.message);
      //     this.cancel();
      //     this.notiflix.hideLoading();
      //   },
      //   error: () => {
      //     this.notiflix.error('Error System');
      //     this.notiflix.hideLoading();
      //   }
      // });
    }
    else {
      this.checkValidated = true;
      this.notiflix.warning('Please enter filed required');
    }
  }
  clearForm() {
    this.myForm.resetForm();
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['/orders-processor/Qgold']);
  }
  addItem() {
    this.listItemQgold.push({} as QgoldFtpOrderItem);
  }
  removeItem(i: number) {
    this.listItemQgold.splice(i, 1);
  }
}