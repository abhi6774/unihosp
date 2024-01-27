import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { notificationRootEndPoint } from '../rootEndPoint';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  io: Socket;

  constructor() {
    this.io = io(`${notificationRootEndPoint}/shareupdate`);
  }

  listen() {
    return new Observable((subscribe) => {
      this.io.on("message", (message) => {
        subscribe.next(message);
      })
    })
  }

  readHi() {

  }

  sendMessage(message: string) {
    this.io.emit("message", message);
  }
}
