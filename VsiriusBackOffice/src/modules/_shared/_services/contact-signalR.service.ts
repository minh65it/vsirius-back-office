import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../_models/contact';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactSignalRService {
  private hubConnection: signalR.HubConnection;
  notificationContactChangedEmitter: EventEmitter<Contact>;

  constructor(private http: HttpClient)
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/hub')
      .build();
    this.notificationContactChangedEmitter = new EventEmitter();
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



  addNotificationContactChangedListener(){
    this.hubConnection.on("ContactNotification", (data: Contact) =>
    {
      this.notificationContactChangedEmitter.emit(data);
    });
  }
}
