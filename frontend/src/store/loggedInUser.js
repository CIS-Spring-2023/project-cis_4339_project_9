import axios from 'axios'
import { defineStore } from 'pinia'
const apiURL = import.meta.env.VITE_ROOT_API

// defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  // central part of the store
  state: () => {
    return {
      name: '',
      isLoggedIn: false,
      role: ''
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password)
        this.$patch({
          isLoggedIn: response.isAllowed,
          name: response.name,
          role: response.role
        })
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      this.$patch({
        name: '',
        isLoggedIn: false,
        role: ''
      })

      // we could do other stuff like redirecting the user
    }
  }
})

// to simulate a login - we will later use our backend to handle authentication
function apiLogin(u, p) {
  return axios
    .post(`${apiURL}/users/login`, { username: u, password: p })
    .then((response) => {
      const { data } = response
      if (data.isAllowed) {
        return { isAllowed: true, name: data.name, role: data.role }
      } else {
        throw new Error('Invalid credentials')
      }
    })
    .catch((error) => {
      throw new Error(error.response.data.message || 'Invalid credentials')
    })
}

export default useLoggedInUserStore
