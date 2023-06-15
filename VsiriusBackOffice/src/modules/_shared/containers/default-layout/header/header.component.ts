import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { InitJsUtility } from "src/modules/_shared/_helpers/int-js-utility";
import { VsiriusOrder } from "src/modules/_shared/_models/vsiriusOrder";
import { NgxNotiflixService } from "src/modules/_shared/_services/ngx-notiflix.service";
import { OrderService } from "src/modules/_shared/_services/orders/order.service";
import { SignalRService } from "src/modules/_shared/_services/signalR.service";
import { AuthService } from "src/modules/_shared/_services/users/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  listOrder: VsiriusOrder[] = [];
  orderModel :  VsiriusOrder = <VsiriusOrder>{};
  countNotification: number = 0;
  isNewNotification: boolean = false;
  time: any;
  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;
  constructor(private authService: AuthService,
    private serviceOrder: OrderService,
    private notiflix: NgxNotiflixService,
    private initJsUtility: InitJsUtility,
    private serviceSignalR: SignalRService,
    private router:Router) { }

  ngOnInit() {
    this.loadNotification();
    this.loadNotificationList();
    this.loadContactNotification();
  }

  ngAfterViewInit(): void {
    this.initJsUtility.toggleChangeTheme();
  }

  loadNotification() {
    this.serviceSignalR.notificationChangedEmitter.subscribe(res => {
      if (res != null) {
        this.notiflix.info('1 New Order Has Been Placed');
        this.changeAnimation();
        this.loadNotificationList();
      }
    })
  }

  loadContactNotification(){
    this.serviceSignalR.notificationContactChangedEmitter.subscribe(res => {
      if (res != null) {
        this.notiflix.info('You have a new contact letter');
        this.changeAnimation();
      }
    })
  }
  loadNotificationList() {
    this.serviceOrder.getTopOrder().subscribe({
      next: res => {
        this.listOrder = res;
      },
      error: () => {

      }
    })
  }

  // rung chuông
  changeAnimation() {
    this.isNewNotification = true;
    this.playNoti();
    this.time = setTimeout(() => {
      this.isNewNotification = false;
    }, 4000);
  }

  loadOrderByUser(orderId:string){
    this.notiflix.showLoading();
    this.serviceOrder.getDetail(orderId).subscribe({
      next:res=>{
        this.orderModel = res;
        this.notiflix.hideLoading();
      },
      error:()=>{
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  showNotification(item: VsiriusOrder)
  {
    this.loadOrderByUser(item?.orderId);
    item.isRead = true;
    this.update(item);
    this.modalEdit.show();
  }

  update(item:VsiriusOrder){
    this.serviceOrder.update(item).subscribe({
      next:res=>{
        if(res.success)
        this.notiflix.success(`Seen order notice at ${new Date(item.createOrderDate).toLocaleString()}`);
      }
    })
  }

  delete(item: VsiriusOrder)
  {
      this.listOrder = this.listOrder.filter(x=>x.orderId != item.orderId);
  }

  showAll(){
    this.router.navigate(['orders']);
  }
  playNoti() {
    let audio = new Audio();
    audio.src = "../../../../../assets/audio/noti.wav";
    audio.load();
    audio.play();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    clearTimeout(this.time);
  }
}
