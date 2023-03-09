<template>
    <div :style="{ height: chartHeight + 'px', width: chartWidth + 'px', margin: chartMargin + 'px', }">
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
      chartHeight: 600, // set the chart height to 400 pixels
      chartWidth: 650, // set the chart width to 400 pixels
      chartMargin: 20, // Move chart to the center
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