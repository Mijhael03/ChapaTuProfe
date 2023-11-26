import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexTooltip } from 'ng-apexcharts';
import { TeacherDetail } from 'src/app/domain/models/qualifying/teacher-detail';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() questionAverageList: TeacherDetail[] = [];
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Calificación",
          data: this.questionAverageList.map(x => x.questionScoreAverage)
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: this.questionAverageList.map(x => x.questionDescription)
      },
      tooltip: {
        enabled: false
      }
    };
  }
}