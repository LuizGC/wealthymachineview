import { Component, OnInit } from '@angular/core';
import { SharesService } from '../shares/shares.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  providers: [],
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {

  selectedShare: string;

  constructor(private sharesService: SharesService) { }

  ngOnInit(): void {
    this.sharesService.subscribeSelectedShare((share: string) => this.updateSelectedShare(share));
  }

  updateSelectedShare(share: string): void {
    this.selectedShare = share;
  }

}
