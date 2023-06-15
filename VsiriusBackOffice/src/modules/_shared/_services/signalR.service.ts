import { EventEmitter, Injectable } from '@angular/core';
import { VsiriusOrder } from '../_models/vsiriusOrder';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  notificationChangedEmitter: EventEmitter<VsiriusOrder>;
  notificationContactChangedEmitter: EventEmitter<Contact>;

  constructor(private http: HttpClient)
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/hub')
      .build();
    this.notificationChangedEmitter = new EventEmitter();
  }
  /**
    * Bắt đầu connection
    */
  startConnection()
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${ environment.baseURL }/orderHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((err: string) => console.log('Error while starting connection: ' + err));
  }

  startConnectionContact()
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${ environment.baseCSRURL }/contactHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((err: string) => console.log('Error while starting connection: ' + err));
  }
  /**
   * vd
   */
  addNotificationChangedListener()
  {
    this.hubConnection.on("OrderNotification", (data: VsiriusOrder) =>
    {
      this.notificationChangedEmitter.emit(data);
    });
  }


  addNotificationContactChangedListener(){
    this.hubConnection.on("ContactNotification", (data: Contact) =>
    {
      this.notificationContactChangedEmitter.emit(data);
    });
  }
}
