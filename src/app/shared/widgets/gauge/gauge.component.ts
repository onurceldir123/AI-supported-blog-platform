import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-widget-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  constructor() { }

  public canvasWidth = 400;
  @Input() public needleValue = 1;
  public centralLabel = '';
  @Input() public name = 'Gauge chart';
  @Input() public bottomLabel = 1;
  @Input() public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(0, 102, 0)', 'red'],
    arcDelimiters: [60],
    rangeLabel: ['0', '100'],
    needleStartValue: 0
  };
  ngOnInit() {

  }
}
