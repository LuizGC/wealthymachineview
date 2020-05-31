import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharesService } from '../shares/shares.service';
import { ChartsService } from './charts.service';
import { Quote } from './quote';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  providers: [],
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {

  selectedShare: string;
  chart: any;
  candleSeries: any;
  volumeSeries: any;

  @ViewChild('frame')
  frame: ElementRef;

  constructor(private sharesService: SharesService, private chartsService: ChartsService) { }

  ngOnInit(): void {
    this.sharesService.subscribeSelectedShare((share: string) => this.updateSelectedShare(share));
  }

  updateSelectedShare(share: string): void {
    this.selectedShare = share;
    if (this.frame) {
      if (!this.chart) {
        const height = this.frame.nativeElement.offsetHeight - 40;
        const width = this.frame.nativeElement.offsetWidth;
        this.chart = this.chartsService.createChart(this.frame, width, height);
        this.candleSeries = this.chartsService.addCandlestickSeries(this.chart);
        this.volumeSeries = this.chartsService.addHistogramSeries(this.chart);
      }
      this.chartsService.listQuotes(this.selectedShare)
        .subscribe((data: Quote[]) => {
          this.candleSeries.setData(data);
          this.volumeSeries.setData(data);
          const length = data.length;
          this.chart
        .timeScale()
          .setVisibleRange({
            from: data[length - 71 || 0].time,
            to: data[length - 1].time
          });
        });
    }
  }
}
