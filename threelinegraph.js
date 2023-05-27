import { LightningElement, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartJS';

export default class Threelinegraph extends LightningElement {
  chartLoaded = false;

  renderedCallback() {
    if (this.chartLoaded) {
      return;
    }

    Promise.all([loadScript(this, chartjs)]).then(() => {
      this.chartLoaded = true;
      this.initializeChart();
    });
  }

  initializeChart() {
    const ctx = this.template.querySelector('canvas');
    const chartInstance = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [500, 800, 1200, 600, 900, 400, 1100],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Dataset 2',
            data: [700, 600, 900, 500, 800, 300, 1000],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Dataset 3',
            data: [300, 400, 600, 200, 500, 100, 800],
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }
}