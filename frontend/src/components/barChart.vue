<!-- Updated code from Sprint 2 to include a bar chart -->
<template>
    <div :style="{ height: chartHeight + 'px', width: chartWidth + 'px', }">
      <canvas ref="myChart"></canvas>
    </div>
</template>
<script>

import { Chart, registerables } from 'chart.js';
import axios from 'axios'
// import data from '@/data/services.json'; // contains dummy data

Chart.register(...registerables);

export default {
  data() {
    return {
      chartHeight: 400, // sets the chart height 
      chartWidth: 450, // sets the chart width 
      Top: 50,
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
        type: "bar",
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
              text: 'Clients by Zip Code',
            },
            legend: {
              display: false,
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