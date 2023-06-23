import { Component, OnInit } from '@angular/core';
import { SignalRService } from './_services/signalR.service';
import { AuthService } from './_services/users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private serviceSignalR: SignalRService) { }
  ngOnInit() {
    this.serviceSignalR.startConnection();
    this.serviceSignalR.addNotificationChangedListener();
  }
  title = 'VsiriusBackOffice';
}
