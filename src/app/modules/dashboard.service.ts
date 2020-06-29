import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataModel } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  postData: {
    TMP_1: number,
    TMP_2: number,
    GS_1: number,
    GS_2: number,
    VBR_1: number
  };
  private datas: DataModel[] = [];
  private failedDatas: DataModel[] = [];
  private dataUpdated = new Subject<DataModel[]>();
  private failedDataUpdated = new Subject<DataModel[]>();

  serviceData = [];

  constructor(private http: HttpClient) { }
  getData() {
    this.http
      .get<{ message: string; result: DataModel[] }>(
        'http://localhost:3000/api/data'
      )
      .subscribe(fetchedData => {
        this.datas = fetchedData.result;
        this.dataUpdated.next(this.datas);
      });
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }
  getFailedDataUpdateListener() {
    return this.failedDataUpdated.asObservable();
  }

    bigChart(){
      return [30, 14, 45, 45, 13, 14, 23, 32, 120];
    }
    cards(){
      return [71, 78, 39, 66, 30, 14, 45, 45, 13, 14, 23, 32, 120];
    }
    pieChart(){
      return  [
          {
            name: 'Running',
            color: 'green',
            y: 71.3
          }, {
            name: 'Error',
            color: 'red',
            y: 28.7
          }];
    }
    getFailedData() {
      return this.http
        .get<{ message: string; result: DataModel[] }>(
          'http://localhost:3000/api/data/failed'
        )
        .subscribe(fetchedData => {
          this.failedDatas = fetchedData.result;
          this.failedDataUpdated.next(this.failedDatas);
        });
    }
    predictData(TMP_1: number, TMP_2: number, GS_1: number, GS_2: number, VBR_1: number){
      this.postData = {
        TMP_1: TMP_1,
        TMP_2: TMP_2,
        GS_1: GS_1,
        GS_2: GS_2,
        VBR_1: VBR_1
      };
      return this.http
        .post<{message: string, result: number, input: object}>(
          'http://localhost:5000/api/predict/5ee003b85bb3776b83e6e682',
          this.postData);
  }
}
