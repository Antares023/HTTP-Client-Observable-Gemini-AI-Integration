import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonItem, IonInput, IonTextarea, IonButton, IonIcon, IonList, IonLabel, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send, sparklesOutline, sparkles, personCircleOutline, chatbubbleEllipsesOutline, codeSlashOutline, logoAngular, schoolOutline, pencilOutline } from 'ionicons/icons';

// Import Service
import { GeminiService } from '../services/gemini.service';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar,
    IonTitle, IonContent, IonFooter, IonItem, IonInput, IonTextarea, IonButton,
    IonIcon, IonLabel, IonSpinner, MarkdownModule, ClipboardModule],
})
export class HomePage {
  userInput = '';
  chatHistory: { role: 'user' | 'model', text: string }[] = [];
  isLoading = false;
  constructor(private geminiService: GeminiService) {
    addIcons({ send, sparklesOutline, sparkles, personCircleOutline, chatbubbleEllipsesOutline, codeSlashOutline, logoAngular, schoolOutline, pencilOutline });
  }

  fillPrompt(text: string) {
    this.userInput = text;
  }

  handleEnter(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Mencegah baris baru
      this.kirimPesan();
    }
  }

  kirimPesan() {
    if (!this.userInput.trim()) return;
    // 1. Tampilkan pesan User di layar
    const pesanUser = this.userInput;
    this.chatHistory.push({ role: 'user', text: pesanUser });
    this.userInput = ''; // Kosongkan input
    this.isLoading = true; // Nyalakan loading
    // 2. Panggil Service AI (Konsep Observable: Subscribe)
    this.geminiService.generateText(pesanUser).subscribe({
      next: (response: { candidates: { content: { parts: { text: any; }[]; }; }[]; }) => {
        // 3. Ambil jawaban dari struktur JSON Google
        const jawabanAI = response.candidates[0].content.parts[0].text;
        // 4. Tampilkan jawaban AI
        this.chatHistory.push({ role: 'model', text: jawabanAI });
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.chatHistory.push({ role: 'model', text: 'Maaf, AI sedang pusing (Error koneksi).' });
        this.isLoading = false;
      }
    });
  }
}
