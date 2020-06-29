import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};

  Highcharts = Highcharts;
  @Input() data: any = [];
  @Input() title: any = [];
  @Input() ytitle: any = [];

  constructor() { }

  ngOnInit() {
      this.chartOptions = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: this.title
        },
        xAxis: {
            type: ''
        },
        yAxis: {
            title: {
                text: this.ytitle
            }
        },
        legend: {
            enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            name: 'Value',
            data: this.data
        }]
    };
      HC_exporting(Highcharts);
      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
  }
}
