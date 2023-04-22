<template>
    <div class="pie-size">
      <!-- ChatGBT helped with this part https://chat.openai.com/-->
    <div :style="{ height: chartHeight + 'px', width: chartWidth + 'px', top: Top + 'px' }">
      <canvas ref="myChart"></canvas>
    </div>
    </div>
</template>
<!-- adjusted the pie chart height and moved the graphs closer-->
<style>
.pie-size {
  top: -150px; /* adjust the height as needed */
  position: relative;
}
</style>

<script>

import { Chart, registerables } from 'chart.js';
import data from '@/data/services.json'; // contains dummy data

Chart.register(...registerables);

export default {
  data() {
    return {
      chartHeight: 400, // sets the chart height 
      chartWidth: 450, // sets the chart width 
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
            position: 'bottom', // legend is below the pie chart 
            data: [10001, 10002, 10003, 10004, 10005], // data for legend 
          },

        },
      },
    });
  },
};
</script>