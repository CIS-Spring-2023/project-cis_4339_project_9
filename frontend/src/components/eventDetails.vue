<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { DateTime } from 'luxon'
import servicesStore from '@/store/services'
import { useLoggedInUserStore } from "@/store/loggedInUser";
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  setup() {
    const store = servicesStore()
    return { v$: useVuelidate({ $autoDirty: true }), store }
  },
  data() {
    return {
      servicesOffered: [],
      selectedServices: [],
      deselectedServices: [],
      clientAttendees: [],
      event: {
        name: '',
        services: [],
        date: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          county: '',
          zip: ''
        },
        description: '',
        attendees: []
      }
    }
  },
  created() {
    axios.get(`${apiURL}/events/id/${this.$route.params.id}`).then((res) => {
      this.event = res.data
      this.event.date = this.formattedDate(this.event.date)
      this.event.attendees.forEach((e) => {
        axios.get(`${apiURL}/clients/id/${e}`).then((res) => {
          this.clientAttendees.push(res.data)
        })
      })
      // // Updated to make services reload in the "Update Event" section
      // axios.get(`${apiURL}/services`).then((res) => {
      //   this.store.services = res.data
      // })

      const ss = this.store.services
      const activeS = ss.filter((el) => el.status === "active")

      this.selectedServices = this.event.services      
      this.servicesOffered = activeS
    })
  },
  methods: {
    // better formatted date, converts UTC to local time
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toISODate()
    },
    handleEventUpdate() {
      this.event.services = this.selectedServices
      axios.put(`${apiURL}/events/update/${this.id}`, this.event).then(() => {
        alert('Update has been saved.')
        this.$router.back()
      })
    },
    editClient(clientID) {
      const user = useLoggedInUserStore()
      if (user.role != 'editor') {
        alert('Please sign in as an editor to access this page.')
      } else {
        this.$router.push({ name: 'updateclient', params: { id: clientID } })
      }
    },
    eventDelete() {
      axios.delete(`${apiURL}/events/${this.id}`).then(() => {
        alert('Event has been deleted.')
        this.$router.push({ name: 'findevents' })
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      event: {
        name: { required },
        date: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Event
      </h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Event Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.name"
              />
              <span class="text-black" v-if="v$.event.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.event.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
              <span style="color: #ff0000">*</span>
              <input
                type="date"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
              />
              <span class="text-black" v-if="v$.event.date.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.event.date.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <!-- added missing v-model connection -->
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label> Services Offered at Event </label>
            <!-- A service shows up under this when it is created and only if its status is set to active -->
            <template v-for="service in selectedServices">
                <label :for="service" class="inline-flex items-center">
                  <span class="ml-2">{{ service }}</span>
                </label>
            </template>
          </div>
          <div class="flex flex-col">
            <label> Services Offered for Events </label>
            <!-- A service shows up under this when it is created and only if its status is set to active -->
            <template v-for="service in servicesOffered">
              <div>
                <label :for="service.name" class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :id="service.name"
                    :value="service.name"
                    v-model="selectedServices"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                    notchecked
                  />
                  <span class="ml-2">{{ service.name }}</span>
                </label>
              </div>
            </template>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line1"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line2"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.city"
              />
            </label>
          </div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.county"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.zip"
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleEventUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Event
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="eventDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Event
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to edit/display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">City</th>
                  <th class="p-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr
                  @click="editClient(client._id)"
                  v-for="client in clientAttendees"
                  :key="client._id"
                >
                  <td class="p-2 text-left">
                    {{ client.firstName + ' ' + client.lastName }}
                  </td>
                  <td class="p-2 text-left">{{ client.address.city }}</td>
                  <td class="p-2 text-left">
                    {{ client.phoneNumber.primary }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
