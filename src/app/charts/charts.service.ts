import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from './quote';
import { createChart } from 'lightweight-charts';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  listQuotes(share: string): Observable<Quote[]> {
    return this.http
      .get<any[]>(share)
      .pipe<any[]>(
        map((quotes) => {
          return quotes.map(quote => {
            const d = new Date(quote.time);
            const yyyy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mm = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
            const dd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return {
              open: parseFloat(quote.open),
              close: parseFloat(quote.close),
              high: parseFloat(quote.high),
              low: parseFloat(quote.low),
              value: parseFloat(quote.value),
              time: `${yyyy}-${mm}-${dd}`,
              color: parseFloat(quote.open) > parseFloat(quote.close) ? 'rgba(255,82,82, 0.8)' : 'rgba(0, 150, 136, 0.8)'
            };
          });
        })
      );
  }

  createChart(frame: ElementRef, width: number, height: number) {
    return createChart(frame.nativeElement, {
      width,
      height,
      layout: {
        backgroundColor: '#131722',
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: {
          color: '#2B2B43',
        },
        horzLines: {
          color: '#363C4E',
        },
      },
      localization: {
        dateFormat: 'dd/MM/yyyy'
      },
      timeScale: {
        timeVisible: false,
        secondsVisible: false,
      }
    });
  }

  addCandlestickSeries(chart) {
    return chart.addCandlestickSeries();
  }

  addHistogramSeries(chart) {
    return chart.addHistogramSeries({
      color: '#26a69a',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      }
    });
  }


}
