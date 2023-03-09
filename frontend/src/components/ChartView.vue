// got class from code 

<template>
    <section class="container">
      <div class="columns">
        <div class="column">
          <barChart />
        </div>
        <div class="column">
          <div>
            <div>
              <EnrollmentBar
                v-if="!loading && !error"
                :label="labels"
                :chart-data="enrolled"
              ></EnrollmentBar>
  
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import EnrollmentBar from "@/components/barChart.vue";
  import pieChart from "@/components/pieChart.vue";

  export default {
    components: {
      EnrollmentBar,
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