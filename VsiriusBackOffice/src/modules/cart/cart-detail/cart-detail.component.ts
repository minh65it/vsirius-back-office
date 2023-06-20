import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ListCartDetailsDto } from 'src/modules/_shared/_models/cart/list-cart-detail-dto';
import { CartService } from 'src/modules/_shared/_services/cart/cart.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  dataDetail: ListCartDetailsDto[] = [];
  cartId: string;
  status: boolean = false;
  constructor(
    private notiflix: NgxNotiflixService,
    private service: CartService, private modalService: BsModalService) { }

  ngOnInit() {

    this.getCardDetailByCartId();

  }
  hideModal() {
    this.modalService.hide();
  }
  getCardDetailByCartId() {


    this.notiflix.showLoading();
    this.service.getCardDetailByCartId(this.cartId, this.status).subscribe(
      {
        next: res => {
          this.dataDetail = res;
          console.log(res);

          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.hideLoading();
        }
      }
    )
  }

}
