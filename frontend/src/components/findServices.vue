<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios'
import { DateTime } from "luxon";
import servicesStore from '@/store/services'
import { useLoggedInUserStore } from '@/store/LoggedInUser'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: "",
      name: "",
      serviceDate: "",
    };
  },
  setup() {
    const store = servicesStore()
    return {store}
  },
  created() {
    axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
        this.store.services = res.data
        this.$router.push({ name: 'findservices' })
      })
    // this.services = this.store.services
  },
  methods: {
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: "utc",
      });
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString();
    },
    handleSubmitForm() {
      let endpoint = "";
      if (this.searchBy === "Service Name") {
        endpoint = `services/search/?name=${this.name}&searchBy=name`;
      } else if (this.searchBy === "Service Date") {
        endpoint = `services/search/?serviceDate=${this.serviceDate}&searchBy=date`;
      }
      console.log("CJ: will do fake posting later..");
    },
    // abstracted method to get services
    // getServices() {
    //   console.log("CJ: calling getServices in getServices on findservs");
    //   this.store.getServices()
    //   this.services = this.store.services
    //   window.scrollTo(0, 0);
    // },
    clearSearch() {
      // Resets all the variables
      this.searchBy = "";
      this.name = "";
      this.serviceDate = "";

      this.getServices();
    },
    editService(id) {
      const user = useLoggedInUserStore()
      if (user.role != 'editor') {
        alert('Please sign in as an editor to access this page.')
      } else {
        this.$router.push({ name: "updateservice", params: {id} });
      }
    },
    disable(status) {
        // this.getServices()
        this.services = this.services.filter(function(el) {return el.status.toLowerCase() === status.toLowerCase()})
    },
  },
};
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Find Service
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Filter Service By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="disable(searchBy)"
              placeholder="Enter service name"
            />
          </label>
        </div>
      </div>
      <div class="mt-5 grid-cols-2">
          <button class="bg-red-700 text-white rounded" type="submit" @click="disable(searchBy)">
                    Filter
                </button>
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
        </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name </th>
              <th class="p-4 text-left">Service Status </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service._id)"
              v-for="service in services"
              :key="service._id">
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.status}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
