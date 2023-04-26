<template>
    <div class="row justify-content-center">
          <div class="col-md-4">
              <h3 class="text-center">Login</h3>
              <form @submit.prevent=" $event => store.login(username, password)" novalidate="true">
                  <div class="form-group">
                      <label>Username</label>
                      <input type="text" class="form-control" v-model="username" placeholder="Username" required>
                  </div>
                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Password" required>
                  </div>
                  <!-- Updated code from Sprint 2 to remove drop-down for role -->
                  <!-- Included the role in user information -->
                  <button class="btn btn-danger mt-3">Login</button>
              </form>
          </div>
    </div>
  </template>
  
  <script>
  import { useLoggedInUserStore } from "@/store/loggedInUser";

  
  export default {
    data: () => {
      return {
        username: "",
        password: "",
        role:""
      };
    },
    setup() {
      const store = useLoggedInUserStore()
      return {
        // you can return the whole store instance to use it in the template
        store,
      }
    }
  };
  </script>