<template>
  <section class="container">
    <div class="charts-container">
      <div class="chart-container chart-container-1">
        <barChart
          v-if="!loading && !error"
          :label="labels"
          :chart-data="enrolled"
        ></barChart>
      </div>
      <div class="chart-container chart-container-2">
        <pieChart
          v-if="!loading && !error"
          :label="labels"
          :chart-data="enrolled"
        ></pieChart>
      </div>
    </div>

    <!-- Start of loading animation -->
    <div class="mt-40" v-if="loading">
      <p
        class="
          text-6xl
          font-bold
          text-center text-gray-500
          animate-pulse
        "
      >
        Loading...
      </p>
    </div>
    <!-- End of loading animation -->

    <!-- Start of error alert -->
    <div class="mt-12 bg-red-50" v-if="error">
      <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
        {{ error.title }}
      </h3>
      <p class="p-4 text-lg font-bold text-red-900">
        {{ error.message }}
      </p>
    </div>
    <!-- End of error alert -->
    <br />
    <br />
  </section>
</template>

<style>
.charts-container {
  display: flex;
  flex-direction: column;
}

.chart-container {
  height: 200px; /* Set a fixed height for each chart container */
}

.chart-container-2 {
  margin-top: 300px; /* Set the margin-top to the height of the previous container */
}

.chart {
  height: 100%; /* Set the chart height to fill the container */
}
</style>

<script>
import barChart from "@/components/barChart.vue";
import pieChart from "@/components/pieChart.vue";

export default {
  components: {
    barChart,
    pieChart,
  },
  data() {
    return {
      labels: [],
      enrolled: [],
      loading: false,
      error: null,
    };
  },
};
</script>
