import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RandomUserService {

    private apiUrl = 'https://randomuser.me/api/';

    constructor(private http: HttpClient) { }

    async getRandomUser(): Promise<any> {
        // WAJIB: Mengubah Observable menjadi Promise menggunakan lastValueFrom
        const observable = this.http.get<any>(this.apiUrl);
        const response = await lastValueFrom(observable);
        return response.results[0];
    }
}
