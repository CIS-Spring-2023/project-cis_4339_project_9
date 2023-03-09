//got from class Code

<template>
    <div>
      <!-- canvas element for chart -->
      <canvas id="pie-chart"></canvas>
    </div>
  </template>
  
  
  <script>
  import { Chart, registerables } from 'chart.js'
  
  //we have to register the registerables with Chart object
  Chart.register(...registerables);
  export default {
    name: 'pieChart',
    data() {
      return {
        pieChartData: pieChartData
      }
    },
    //establish Chart object after mounting the component
    mounted() {
      const ctx = document.getElementById('pie-chart');
      new Chart(ctx, this.pieChartData);
    }
  }
  </script>