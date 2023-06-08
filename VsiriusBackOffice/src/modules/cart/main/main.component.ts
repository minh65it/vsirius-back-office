import { Router } from '@angular/router';
import { CartService } from './../../_shared/_services/cart/cart.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { ListCartDto } from 'src/modules/_shared/_models/cart/list-cart-dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listCartDto: ListCartDto[] = [];
  @ViewChild('modalDetail', { static: false }) modalDetail?: ModalDirective;
  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  } as Pagination;
  fullTextSearch: string = '';

  constructor(
    private notiflix: NgxNotiflixService,
    private service: CartService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getListCartAll();
  }

  getListCartAll() {
    this.notiflix.showLoading();
    this.service.getListCartAll(this.pagination, this.fullTextSearch).subscribe(
      {
        next: res => {
          this.listCartDto = res.result;
          this.pagination = res.pagination;
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.error('Error');
          this.notiflix.hideLoading();
        }
      }
    )
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getListCartAll();
  }

  search() {
    this.pagination.pageNumber == 1 ? this.getListCartAll() : this.pagination.pageNumber = 1;
  }
  detail(cartID: string | null, status: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        cartId: cartID,
        status: status,
      },
      class: 'modal-xl',
    };
    this.modalService.show(CartDetailComponent, initialState);
  }
}
