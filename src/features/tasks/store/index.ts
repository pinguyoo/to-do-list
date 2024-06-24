import { createTask, deleteTask, fetchTasks, updateTask } from '@/features/tasks/services'
import { Task } from '@/features/tasks/types'

interface State {
  tasks: Task[]
  pageSize: number;
  currentPage: number;
}

type Commit = (key: string, ...args: unknown[]) => void

const state: State = {
  tasks: [],
  pageSize: 2,
  currentPage: 1
}

const getters = {
  tasks: (state: State) => state.tasks,
  pageSize: (state: State) => state.pageSize,
  currentPage: (state: State) => state.currentPage
}

const mutations = {
  SET_TASKS (state: State, tasks: Task[]) {
    state.tasks = tasks
  },
  ADD_TASK (state: State, task: Task) {
    state.tasks.push(task)
  },
  UPDATE_TASK (state: State, updatedTask: Task) {
    const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id)
    if (taskIndex === -1) return
    state.tasks.splice(taskIndex, 1, updatedTask)
  },
  DELETE_TASK (state: State, taskId: number) {
    state.tasks = state.tasks.filter(task => task.id !== taskId)
  },
  SET_PAGE (state: State, page: number) {
    state.currentPage = page
  }
}

const actions = {
  async fetchTasks ({ commit }: { commit: Commit }) {
    const tasks = await fetchTasks()
    commit('SET_TASKS', tasks)
  },
  async addTask ({ commit }: { commit: Commit }, task: Task) {
    const newTask = await createTask(task)
    commit('ADD_TASK', newTask)
  },
  async updateTask ({ commit }: { commit: Commit }, task: Task) {
    const updatedTask = await updateTask(task)
    commit('UPDATE_TASK', updatedTask)
  },
  async deleteTask ({ commit }: { commit: Commit }, taskId: number) {
    await deleteTask(taskId)
    commit('DELETE_TASK', taskId)
  },
  setPage ({ commit }: { commit: Commit }, currentPage: number) {
    commit('SET_PAGE', currentPage)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
