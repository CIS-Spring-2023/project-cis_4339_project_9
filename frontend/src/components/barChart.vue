<!-- Updated code from Sprint 2 to include a bar chart -->
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
      chartHeight: 400, // sets the chart height 
      chartWidth: 450, // sets the chart width 
      Top: 50,
    };
  },
  async mounted() {
    const services = data;

    const zipCodes = services.map((service) => service.zipCode);
    const clientCounts = services.map((service) => service.clientCount);

    new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: zipCodes,
        datasets: [
          {
            data: clientCounts,
            backgroundColor: [ // colors the pie chart 
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
            display: false
          },
        },
      },
    });
  },
};
</script>