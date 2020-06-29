import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  temperature1 = 0;
  temperature2 = 0;
  gas1 = 0;
  gas2 = 0;
  vbr1 = 0;

  temperaturesend1 = 50;
  gassend1 = 20;


  post: {
    message: string,
    id: string,
    accuracy_score: number,
    column_names: any,
    features: any,
    names: any,
    types: any
  };
  predictionData: {
    message: string,
    predict: number,
    input: object
  };
  inputData: {
    TMP_1: number,
    TMP_2: number,
    GS_1: number,
    GS_2: number,
    VBR_1: number
  };
  constructor(public dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.dashboardService.predictData(
      this.temperaturesend1,
      Math.floor(Math.random() * 80) + 2,
      Math.floor(Math.random() * 20) + 10,
      Math.floor(Math.random() * 32) + 10,
      Math.floor(Math.random() * -15) + 9
    ).subscribe(prediction => {
      this.predictionData = {
        message : prediction.message,
        predict : prediction.result,
        input: prediction.input
      };
      this.temperature1 = this.predictionData.input['TMP_1']
      this.temperature2 = this.predictionData.input['TMP_2']
      this.gas1 = this.predictionData.input['GS_1']
      this.gas2 = this.predictionData.input['GS_2']
      this.vbr1 = this.predictionData.input['VBR_1']
    });

    interval(5 * 1000)
    .pipe(
        flatMap(() => this.dashboardService.predictData(
            this.temperaturesend1,
            Math.floor(Math.random() * 80) + 2,
            this.gassend1,
            Math.floor(Math.random() * 32) + 10,
            Math.floor(Math.random() * -15) + 9
          ))
    )
    .subscribe(prediction => {
      this.predictionData = {
        message : prediction.message,
        predict : prediction.result,
        input: prediction.input
      };
      this.temperature1 = this.predictionData.input['TMP_1']
      this.temperature2 = this.predictionData.input['TMP_2']
      this.gas1 = this.predictionData.input['GS_1']
      this.gas2 = this.predictionData.input['GS_2']
      this.vbr1 = this.predictionData.input['VBR_1']

      this.temperaturesend1 = Math.floor(Math.random() * 100) + 10;
      while (Math.abs(this.temperaturesend1 - this.temperature1) > 5) {
        this.temperaturesend1 = Math.floor(Math.random() * 100) + 10;
      }
      this.gassend1 = Math.floor(Math.random() * 20) + 10;
      while (Math.abs(this.gassend1 - this.gas1) > 3) {
        this.gassend1 = Math.floor(Math.random() * 100) + 10;
      }
      console.log(this.gassend1 + '-' + this.gas1);
    });
  }
}
