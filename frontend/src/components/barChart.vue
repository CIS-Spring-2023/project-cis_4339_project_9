<template>
    <div :style="{ height: chartHeight + 'px', width: chartWidth + 'px', }">
      <canvas ref="myChart"></canvas>
    </div>
</template>
<script>

import { Chart, registerables } from 'chart.js';
import data from '@/data/services.json'; // contains dummy data

Chart.register(...registerables);

export default {
  data() {
    return {
      chartHeight: 800, // set the chart height to 400 pixels
      chartWidth: 850, // set the chart width to 400 pixels
      // chartMargin: 60, // set the chart margin
    };
  },
  async mounted() {
    const services = data;

    const zipCodes = services.map((service) => service.zipCode);
    const clientCounts = services.map((service) => service.clientCount);

    new Chart(this.$refs.myChart, {
      type: "pie",
      data: {
        labels: zipCodes,
        datasets: [
          {
            data: clientCounts,
            backgroundColor: [ //colors the pie chart 
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#33FF99',
              '#FF99CC',
              '#99CCFF',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        // Reference: https://www.chartjs.org/docs/latest/general/padding.html 
        layout: {
            padding: {
                left: 400,
                bottom: 180
            }
        },
        plugins: {
          title: {
            display: true,
            text: 'Clients by Zip Code',
          },
          legend: {
            position: 'bottom', //legend is below pie chart 
          },
        },
      },
    });
  },
};
</script>