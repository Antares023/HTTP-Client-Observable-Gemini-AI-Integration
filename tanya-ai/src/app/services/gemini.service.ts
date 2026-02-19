import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
private apiKey = 'Ganti API gemini disini';
// private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
// Gunakan 'gemini-pro' agar tidak Error 404
//private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// GUNAKAN MODEL TERBARU (Gemini 2.5 Flash)
private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

constructor(private http: HttpClient) { }
generateText(prompt: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };
    return this.http.post<any>(url, body);
  }
}
