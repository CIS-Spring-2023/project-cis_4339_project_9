<template>
  <div class="pie-size">
    <!-- ChatGPT helped with this part https://chat.openai.com/-->
  <div :style="{ height: chartHeight + 'px', width: chartWidth + 'px', top: Top + 'px' }" class="min-w-full">
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
import axios from 'axios'

Chart.register(...registerables);

export default {
data() {
  return {
    chartHeight: 400, // sets the chart height 
    chartWidth: 450, // sets the chart width 
  };
},
// allows data to populate from apis help from chatgpt
async mounted() {
  try {
    const response = await axios.get('http://localhost:5173/charts');
    const services = response.data;
    const zipCodes = services.map((service) => service.zipCode);
    const clientCounts = services.map((service) => service.clientCount);

    new Chart(this.$refs.myChart, {
      type: "pie",
      data: {
        labels: zipCodes,
        datasets: [
          {
            data: clientCounts,
            backgroundColor: [
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
          },
          legend: {
            position: 'top', // legend is below the pie chart 
            data: [10001, 10002, 10003, 10004, 10005], // data for legend 
          },

        },
      },
    });
  } catch (error) {
    console.error(error);
  }
},
};
</script>