import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9831/api/chats'; 

  constructor(private http: HttpClient) { }

  sendMessage(chatId: number, message: { senderId: number; content: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${chatId}/messages`, message);
  }

  getChatHistory(chatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${chatId}/messages`);
  }

  getUserChats(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
