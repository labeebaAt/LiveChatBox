import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: HubConnection;

  constructor() { }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:9831/chathub') // Replace with your SignalR hub URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch(err => console.error('Error while establishing SignalR connection: ', err));
  }

  onMessageReceived(callback: (message: any) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
