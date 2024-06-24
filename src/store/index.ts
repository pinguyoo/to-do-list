import { createStore } from 'vuex'
import taskStore from '@/features/tasks/store'

export default createStore({
  modules: {
    tasks: taskStore
  }
})
