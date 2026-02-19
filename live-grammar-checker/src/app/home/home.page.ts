import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class HomePage {
  grammarInput = new FormControl('');
  result: { status: string; correction: string } | null = null;
  loading = false;

  constructor(private geminiService: GeminiService) {
    this.setupGrammarChecker();
  }

  setupGrammarChecker() {
    this.grammarInput.valueChanges.pipe(
      debounceTime(1000), // 1. WAJIB: debounceTime(1000)
      distinctUntilChanged(),
      switchMap(text => { // 2. WAJIB: switchMap
        if (!text || text.trim() === '') {
          this.loading = false;
          this.result = null;
          return of(null);
        }
        this.loading = true;
        this.result = null;
        return this.geminiService.checkGrammar(text);
      })
    ).subscribe({
      next: (res) => {
        this.loading = false;
        if (res) {
          this.result = res;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }
}
