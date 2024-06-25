# To-Do List Application
This is a simple to-do list web application built with Vue 3, Vite, Vuex. The application supports creating, updating, deleting, and filtering tasks, with sorting and pagination features.

## Features

- Add, update, and delete tasks
- Filter tasks by completion status
- Sort tasks by creation date (newest to oldest, oldest to newest)
- Pagination for tasks

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Set up environment variables
#### Create a .env file in the root directory of the project and add the following line. You can change the API host to match your server’s address.
```bash
VITE_API_HOST=http://localhost:3000
```

### 4. Run the server - you can use the provided server or use your own - [simple server](https://github.com/pinguyoo/simple-server.git)

### 5. Run the application
```bash
yarn dev
```


## Project Structure
```
project-root/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FilterOptions.vue
│   │   ├── FooterComponent.vue
│   │   ├── HeaderComponent.vue
│   │   ├── SortOption.vue
│   ├── features/
│   │   ├── tasks/
│   │   │   ├── components/
│   │   │   │   ├── AddTask.vue
│   │   │   │   ├── TaskCard.vue
│   │   │   ├── store/
│   │   │   │   ├── index.ts
│   │   │   ├── services/
│   │   │   │   ├── index.ts
│   ├── layouts
│   │   ├── DefaultLayout.vue
│   ├── pages/
│   │   ├── HomePage.vue
│   ├── App.vue
│   ├── store
│   ├── main.ts
├── .env
├── package.json
├── vite.config.js
└── yarn.lock
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
