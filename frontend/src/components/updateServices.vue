<template>
    <main>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Service
      </h1>
      <div class="px-10 pt-20">
          <form @submit.prevent="">
              <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
              >
              <h2 class="text-2xl font-bold">Update Service Details</h2>
              <!-- form field -->
              <div class="flex flex-col">
                  <label class="block">
                  <span class="text-gray-700">Service Name</span>
                  <span style="color: #ff0000">*</span>
                  <input
                      type="text"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder
                      v-model="name"
                  />
                  </label>
              </div>
              <!-- form field -->
              <div class="flex flex-col">
                  <label class="block">
                  <span class="text-gray-700">Service Status</span>
                  <span style="color: #ff0000">*</span>
                  <div class="flex flex-col">
                  <select
                      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      v-model="status"
                  >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                  </select>
                  </div>
                  </label>
              </div>
              <button class="bg-red-700 text-white rounded" type="submit" @click="updateService">
                  Update
              </button>
              </div>
          </form>
      </div>
  
    </main>
  </template>
  <script>
  import { useLoggedInUserStore } from "@/store/loggedInUser";
  import servicesStore from '@/store/services'
  export default {
    props: ['id'],
    setup() {
      const store = servicesStore()
      return {store}
    },
    data() {
      return {
        name:'',
        status:''
      }
    },
    beforeCreate() {
      const user = useLoggedInUserStore()
      if (user.role !== 'editor') {
        alert('Please sign in as an editor to access this page.')
        this.$router.replace({ name: 'service' })
      }
    },
    created() {
      const ss = this.store.services
      console.log(ss)
      const s = ss.find((el) => el.id === parseInt(this.$route.params.id))
      this.name = s.name
      this.status = s.status
    },
    methods: {
      async updateService() {
        try {
          await this.store.updateService(parseInt(this.id), this.name, this.status)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  </script>
  