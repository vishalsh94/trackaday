import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Point, registerables } from "chart.js";
import { getTaskTrackingStats, getTimeTrackingStats } from 'src/app/stats/stats';

Chart.register(...registerables);


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {
  // @ViewChild('chart') chart: Chart;
  // private chart: Chart;
  private data: Point[];

  constructor() {
    this.data = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 6 }, { x: 4, y: 2 }, { x: 4.1, y: 6 }];
  }

  ngOnInit(): void {
    this.createTimeTrackigStatsChart();
    this.createTaskTrackingList();
  }

  createTimeTrackigStatsChart() {
    const timeTrackingStats = getTimeTrackingStats();

    // for (var i = 0; i < 5; i++) {
    //   timeTrackingStats = timeTrackingStats.concat(timeTrackingStats);
    // }

    const labelsList = timeTrackingStats.map(val => val[0]);

    const dataList = timeTrackingStats.map(val => val[1]);

    const backgroundColorList = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const borderColorList = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const myChart = new Chart("timeTrackingStats", {
      type: 'bar',
      data: {
        labels: labelsList,
        datasets: [{
          label: 'No. of hours worked for last 30 days',
          data: dataList,
          backgroundColor: Array(labelsList.length).fill(0).map((_, index) => backgroundColorList[index % backgroundColorList.length]),
          borderColor: Array(labelsList.length).fill(0).map((_, index) => borderColorList[index % borderColorList.length]),
          borderWidth: 1
        }]
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true
      //     }
      //   }
      // }
    });

    console.log(myChart);
  }

  createTaskTrackingList() {
    const taskTrackingStatsList = getTaskTrackingStats();
    console.log(taskTrackingStatsList, "taskTrackingStatsList");

    let taskTrackingElement = "";
    Object.keys(taskTrackingStatsList).map(day => {
      let taskUL = "<ul>";
      taskTrackingStatsList[day].forEach((val: any[]) => {
        taskUL += "<li>Task: " + val[0] + " Time: " + Math.round(val[1] / (36 * (10 ** 5)) * 100) / 100 + " hrs</li>"
      });
      taskUL += "</li>";
      taskTrackingElement += "<li>" + day + taskUL + "</li>"
    });

    const el = document.getElementById("taskTrackingStats");
    if (el !== null) {
      el.innerHTML = taskTrackingElement;
    }
  }
}
