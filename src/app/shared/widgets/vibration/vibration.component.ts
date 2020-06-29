import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-vibration',
  templateUrl: './vibration.component.html',
  styleUrls: ['./vibration.component.scss']
})
export class VibrationComponent implements OnInit {
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
    arcColors: ['green', 'red', 'green'],
    arcDelimiters: [40, 60],
    rangeLabel: ['-20', '20'],
    needleStartValue: 0
  };
  ngOnInit() {

  }
}
