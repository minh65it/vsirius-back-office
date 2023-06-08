import { Component, OnInit } from "@angular/core";
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
export class HeaderComponent implements OnInit {
  listOrder: VsiriusOrder[] = [];
  countNotification: number = 0;
  isNewNotification: boolean = false;
  time: any;
  constructor(private authService: AuthService,
    private serviceOrder: OrderService,
    private notiflix: NgxNotiflixService,
    private serviceSignalR: SignalRService) { }

  ngOnInit() {
    this.loadNotification();
    this.loadNotificationList();
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
  showNotification(item: VsiriusOrder)
  {
    // this.seenNotificationModel = { ...item };
    // this.detailModal.show();
  }
  delete(item: VsiriusOrder)
  {
    
  }
  showAll(){

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
}
