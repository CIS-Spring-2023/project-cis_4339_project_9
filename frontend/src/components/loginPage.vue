<template>
    <div class="row justify-content-center">
          <div class="col-md-4">
              <h3 class="text-center">Login</h3>
              <form @submit.prevent=" $event => store.login(username, password)" novalidate="true">
                  <div class="form-group">
                      <label>User name</label>
                      <input type="text" class="form-control" v-model="username" placeholder="username" required>
                  </div>
                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="password" required>
                  </div>
                  <!-- Updated code from Sprint 2 to remove drop-down for role -->
                  <!-- Included the role in user information -->
                  <button class="btn btn-danger mt-3">Log In</button>
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