import { defineStore } from 'pinia'
import axios from 'axios'

const apiURL = import.meta.env.VITE_ROOT_API

export const servicesStore = defineStore({
  id: 'services',
  state: () => {
    return {
      services: []
    }
  },
  actions: {
    async getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
        this.$router.push({ name: 'findservices' })
      })
    },
    async addServices(name, status) {
      const s = { id: this.services.length + 1, name: name, status: status }
      axios
        .post(`${apiURL}/services`, s)
        .then(() => {
          alert('Event has been added.')
          this.$router.push({ name: 'findservices' })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async updateService(id, name, status) {
      const s = { id, org: 1, name, status }
      axios
        .put(`${apiURL}/services/update/${id}`, s)
        .then(() => {
          alert('Update has been saved.')
          this.$router.push({ name: 'findservices' })
        })
    }
  }
})

export default servicesStore
