import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      role: "",
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password, role) {
      try {
        const response = await apiLogin(username, password, role);
        this.$patch({
          isLoggedIn: response.isAllowed,
          name: response.name,
          role: response.role
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.$patch({
        name: "",
        isLoggedIn: false,
        role: ""
      });

      // we could do other stuff like redirecting the user
    }
  }
});

import users from '@/data/users.json'

// simulate a login - we will later use our backend to handle authentication
function apiLogin(u, p, r) {
  const user = users.find(({username, password, role}) => username === u && password === p && role === r);
  if (user) return Promise.resolve({ isAllowed: true, name: user.username, role: user.role });
//   if (p === "ed") return Promise.resolve({ isAllowed: false });
  return Promise.reject(new Error("invalid credentials"));
}

export default useLoggedInUserStore
