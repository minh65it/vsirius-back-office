import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QgoldFtpOrderObject } from 'src/modules/_shared/_models/order-processor/qgold-ftp-order-object';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.scss']
})
export class SubmitOrderComponent implements OnInit {

  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  qgoldFtpOrderObject: QgoldFtpOrderObject = {} as QgoldFtpOrderObject;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitOrder() { }
  clearForm() {
    this.myForm.resetForm(
    );
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['/orders-processor/Qgold']);
  }
}
