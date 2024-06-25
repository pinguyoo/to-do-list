import axios from 'axios'
import { Task } from '@/features/tasks/types'

export const fetchTasks = async () => {
  const response = await axios.get('http://127.0.0.1:3000/api/tasks')
  return response.data
}

export const createTask = async (task: Task) => {
  const response = await axios.post('http://127.0.0.1:3000/api/tasks', task)
  return response.data
}

export const updateTask = async (task: Task) => {
  const response = await axios.put(`http://127.0.0.1:3000/api/tasks/${task.id}`, task)
  return response.data
}

export const deleteTask = async (taskId: number) => {
  await axios.delete(`http://127.0.0.1:3000/api/tasks/${taskId}`)
}
