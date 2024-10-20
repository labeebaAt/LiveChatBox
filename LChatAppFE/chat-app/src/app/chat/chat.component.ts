import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { SignalRService } from '../signalr.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  messages: any[] = []; // Array to hold chat messages
  newMessage: string = ''; // Variable for the new message input
  chatId!: number; // To store the current chat ID
  loggedInUserId!: number; // Variable to store the logged-in user's ID

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private signalRService: SignalRService, // SignalR service for real-time messaging
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    this.chatId = +this.route.snapshot.paramMap.get('id')!; // Get chat ID from route parameters
    this.loadChatHistory(); // Load chat history on component initialization
    this.signalRService.startConnection(); // Start SignalR connection
    this.signalRService.onMessageReceived((message) => {
      this.messages.push(message); // Push received messages to the chat
    });

    this.loggedInUserId = this.authService.getLoggedInUserId() ?? 0;; // Get the logged-in user's ID
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory(this.chatId).subscribe({
      next: (data) => {
        this.messages = data; // Assign fetched messages to the component's messages array
      },
      error: (err) => console.error(err),
    });
  }

  sendMessage(): void {
    const message = {
      senderId: this.loggedInUserId, // Use the logged-in user's ID
      content: this.newMessage,
    };

    this.chatService.sendMessage(this.chatId, message).subscribe({
      next: (data) => {
        this.newMessage = ''; // Clear the input field after sending
        this.messages.push(data); // Add the sent message to the chat
      },
      error: (err) => console.error(err),
    });
  }
}
