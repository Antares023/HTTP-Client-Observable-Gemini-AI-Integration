import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RandomUserService } from '../services/random-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {

  user: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private randomUserService: RandomUserService) { }

  ngOnInit() {
    this.generateUser();
  }

  async generateUser() {
    this.loading = true;
    this.error = null;
    try {
      this.user = await this.randomUserService.getRandomUser();
    } catch (err) {
      console.error('Error fetching user:', err);
      this.error = 'Gagal memuat data user.';
    } finally {
      this.loading = false;
    }
  }
}
