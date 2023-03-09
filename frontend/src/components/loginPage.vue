<template>
    <div class="row justify-content-center">
          <div class="col-md-4">
              <h3 class="text-center">Login</h3>
              <form @submit.prevent=" $event => store.login(username, password, role)" novalidate="true">
                  <div class="form-group">
                      <label>User name</label>
                      <input type="text" class="form-control" v-model="username" placeholder="username" required>
                  </div>
                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="password" required>
                  </div>
                  <div class="form-group">
                    <label class="block">Role</label>
                    <select class="appearance-none border rounded-md w-2/3 " v-model="role" required>
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                      </select>
                  </div>
                  <button class="btn btn-danger mt-3">Submit</button>
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