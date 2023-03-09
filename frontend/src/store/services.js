import { defineStore } from 'pinia'

export const servicesStore = defineStore({
  id: 'services',
  state: () => {
    return {
      services: []
    }
  },
  actions: {
    async addServices(name, status) {
        const s = {name: name, status: status}
      this.services.push(s)
      this.$router.push({ name: "service" })
    },
    async updateService(name, status) {
      const serviceIndex = this.services.findIndex(service => service.name === name)
      if (serviceIndex < 0) {
        throw new Error(`Service ${name} not found`)
      }
      this.services[serviceIndex].status = status
      this.$router.push({ name: "service" })
    },
  }
})

export default servicesStore
