import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharesService {

  private dataSource = new BehaviorSubject<string>('');
  private date = Math.random();

  constructor(private http: HttpClient) { }

  listShares() {
    return this.http.get<Array<string>>('shareCodes');
  }

  changeSelectedShare(newShare: string) {
    console.log(this.date);
    this.dataSource.next(newShare);
  }

  subscribeSelectedShare(actionFunction: (data: string) => void) {
    console.log(this.date);
    this.dataSource.subscribe(actionFunction);
  }
}