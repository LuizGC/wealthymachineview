import { Component, OnInit } from '@angular/core';
import { SharesService } from './shares.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  providers: [],
  styleUrls: ['./shares.component.less']
})
export class SharesComponent implements OnInit {

  shares: Array<string>;
  selectedShare: string;

  constructor(private sharesService: SharesService) { }

  ngOnInit(): void {
    this.sharesService.listShares()
    .subscribe((shares: Array<string>) => {
      this.shares = shares;
      this.onSelect(shares[0]);
    });
  }

  onSelect(share: string) {
    this.selectedShare = share;
    this.sharesService.changeSelectedShare(share);
  }

}
