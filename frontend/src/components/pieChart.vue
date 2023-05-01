<!-- allowed pie chart to populate with bar on dashboard -->

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
              '#B0DAFF',
              '#146C94',
              '#9E6F21',
              '#FFEEB3',
              '#B8E7E1',
              '#D4FAFC',
              '#BFCCB5',
              '#7C96AB',
              '#B7B7B7',
              '#EDC6B1',
              '#41644A'
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
            position: 'bottom', // legend is below the pie chart 
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