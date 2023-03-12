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
      const s = {id: this.services.length + 1, name: name, status: status}
      this.services.push(s)
      this.$router.push({ name: "service" })
    },
    async updateService(id, name, status) {
      const service = this.services.find((s) => s.id === id)
      if (!service) {
        throw new Error(`Service with id ${id} not found`)
      }
      service.name = name
      service.status = status
      this.$router.back()
    },
  }
})

export default servicesStore
