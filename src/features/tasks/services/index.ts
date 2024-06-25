import axios from 'axios'
import { Task } from '@/features/tasks/types'

const API_URL = `${import.meta.env.VITE_APP_API_HOST}/api/tasks`

export const fetchTasks = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, task)
  return response.data
}

export const updateTask = async (task: Task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task)
  return response.data
}

export const deleteTask = async (taskId: number) => {
  await axios.delete(`${API_URL}/${taskId}`)
}
