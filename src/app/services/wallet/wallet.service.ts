import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'http://localhost:8080/api'; // Backend API URL

  private walletUpdatedSource = new BehaviorSubject<boolean>(false);
  walletUpdated$ = this.walletUpdatedSource.asObservable();

  constructor(private http: HttpClient) {}

  notifyWalletUpdated() {
    this.walletUpdatedSource.next(true);
  }

  setWallet(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/wallet/${userId}`);
  }
}
