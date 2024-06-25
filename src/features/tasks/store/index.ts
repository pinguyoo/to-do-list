import { createTask, deleteTask, fetchTasks, updateTask } from '@/features/tasks/services'
import type { SortOption } from '@/types'
import type { Task } from '@/features/tasks/types'
import getSortedItems from './utils/get-sorted-items'

interface State {
  tasks: Task[]
  pageSize: number;
  currentPage: number;
  sortBy: SortOption;
}

type Commit = (key: string, ...args: unknown[]) => void

const state: State = {
  tasks: [],
  pageSize: 2,
  currentPage: 1,
  sortBy: 'newest'
}

const getters = {
  tasks: (state: State) => state.tasks,
  pageSize: (state: State) => state.pageSize,
  currentPage: (state: State) => state.currentPage,
  sortBy: (state: State) => state.sortBy,
  sortedTasks: (state: State) => getSortedItems({ originItems: state.tasks, sortBy: state.sortBy }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paginatedTasks: (state: State, getters: any) => {
    const start = (state.currentPage - 1) * state.pageSize
    const end = start + state.pageSize
    return getters.sortedTasks.slice(start, end)
  }
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
  },
  SET_SORT_BY (state: State, sortBy: SortOption) {
    state.sortBy = sortBy
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
  },
  setSortBy ({ commit }: { commit: Commit }, sortBy: SortOption) {
    commit('SET_SORT_BY', sortBy)
    commit('SET_PAGE', 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
