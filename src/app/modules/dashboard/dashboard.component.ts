import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';
import { DataModel } from '../dashboard.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  bigChart = [];
  bigChart2 = [];
  cards = [];
  pieChart = [];
  predzero = 0;
  tableData = [];
  datas: DataModel[] = [];
  private dataSub: Subscription;
  private failedDataSub: Subscription;


  constructor(private dashboardService: DashboardService) { }
  ngOnInit() {
    this.dashboardService.getData();
    this.dataSub = this.dashboardService.getDataUpdateListener()
      .subscribe((datas: DataModel[]) => {
        this.bigChart = datas['TMP_1'];
        this.bigChart2 = datas['GS_1'];
        this.predzero = datas['prediction'];
        this.datas = datas;
      });
    this.dashboardService.getFailedData();
    this.failedDataSub = this.dashboardService.getFailedDataUpdateListener()
    .subscribe((datas: DataModel[]) => {
      this.tableData = datas;
    });
    // this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
  }

  onButton(){
    console.log(this.bigChart);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
