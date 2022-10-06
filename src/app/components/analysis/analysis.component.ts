import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Point, registerables } from "chart.js";
import { getTaskTrackingStats, getTimeTrackingStats } from 'src/app/stats/stats';

// const M = require("../node_modules/materialize-css/dist/js/materialize.min.js")
// M.AutoInit()

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
    // document.addEventListener('DOMContentLoaded', function () {
    //   var elems = document.querySelectorAll('.collapsible');
    //   var instances = M.Collapsible.init(elems);
    // });

    // Or with jQuery

    // $(document).ready(function () {
    //   $('.collapsible').collapsible();
    // });

    this.createTimeTrackigStatsChart();
    this.createTaskTrackingList();
    this.createHourlyTrackingList();
  }

  createTimeTrackigStatsChart() {
    let stats = getTimeTrackingStats();
    const timeTrackingStats = stats[0];
    // for (var i = 0; i < 5; i++) {
    //   timeTrackingStats = timeTrackingStats.concat(timeTrackingStats);
    // }

    const labelsList = timeTrackingStats.map((val: any[]) => val[0]);

    const dataList = timeTrackingStats.map((val: any[]) => val[1]);

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

  callAbc() {
    console.log(111111);
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
      const k = "\"collapsible-body-" + day + "\"";
      const func = "(()=>{if(document.getElementById(" + k + ").style.display==\"\") {document.getElementById(" + k + ").style.display=\"block\"} else {document.getElementById(" + k + ").style.display=\"\"}})()";
      taskTrackingElement += "<li><div class='collapsible-header' onClick='" + func + "'>" + day + "</div><div class='collapsible-body' id='collapsible-body-" + day + "'>" + taskUL + "</div></li>"
    });

    const el = document.getElementById("taskTrackingStats");
    if (el !== null) {
      el.innerHTML = taskTrackingElement;
    }
  }

  createHourlyTrackingList() {
    let stats = getTimeTrackingStats();
    const timeTrackingStats = stats[1];

    // for (var i = 0; i < 5; i++) {
    //   timeTrackingStats = timeTrackingStats.concat(timeTrackingStats);
    // }

    const labelsList = Array(24).fill(0).map((_, index) => index);

    const dataList = labelsList.map(val => timeTrackingStats[val]);

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

    const myChart = new Chart("hourlyTrackingStats", {
      type: 'bar',
      data: {
        labels: labelsList,
        datasets: [{
          label: 'Average user involvment during the day',
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
}
