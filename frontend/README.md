# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.
For state management [Pinia](https://pinia.vuejs.org/) is also implemented.

## Project Setup

    npm install

### Before Startup
You need to either have a local backend running and or use a cloud deployed backend for full functionality. However, the frontend will build with limited features i.e.(Services) 

Setup a .env file with following variables, e.g.:

    VITE_ROOT_API=http://localhost:3000

VITE_ROOT_API is the URL for the backend API, either on localhost or in the cloud.
### Compiles and hot-reloads for development

    npm run dev

### Compiles and hot-reloads for development in codespaces 

    npm run start -- --host 0.0.0.0

### Logging in to the app

There are two types of users in the app Viewers and Editors. Viewers have access to the Dashboard and entity lookup pages. Editors get access to both lookup and create pages. A list of users are located in the src/data/users.json file.

To log in to the app, follow these steps:

1. On the lefthand sidebar click the login route.
2. Enter your chosen username, password, and select user type.
3. Click on the "Log in" button to access the app.