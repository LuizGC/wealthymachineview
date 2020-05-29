import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharesService {

  constructor(private http: HttpClient) { }

  listShares() {
    return this.http.get<Array<string>>('shareCodes');
  }
}
