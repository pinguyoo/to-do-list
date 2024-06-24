import axios from 'axios'
import { Task } from '@/features/tasks/types'

export const fetchTasks = async () => {
  const response = await axios.get('/api/tasks')
  console.log(response.data)
  return [{
    id: 1,
    title: 'Task 1',
    description: 'Description 1 Description DescriptionDescriptionDescriptionDescriptionDescription',
    completed: false,
    createdAt: '2024-06-24T00:00:00.000Z'
  }, {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: true,
    createdAt: '2024-06-24T00:00:00.000Z'
  }, {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    completed: false,
    createdAt: '2024-06-24T00:00:00.000Z'
  }, {
    id: 4,
    title: 'Task 4',
    description: 'Description 4',
    completed: true,
    createdAt: '2024-06-24T00:00:00.000Z'
  }, {
    id: 5,
    title: 'Task 5',
    description: 'Description 5',
    completed: false,
    createdAt: '2024-06-24T00:00:00.000Z'
  }]
  // return response.data
}

export const createTask = async (task: Task) => {
  const response = await axios.post('/api/tasks', task)
  return response.data
}

export const updateTask = async (task: Task) => {
  const response = await axios.put(`/api/tasks/${task.id}`, task)
  return response.data
}

export const deleteTask = async (taskId: number) => {
  await axios.delete(`/api/tasks/${taskId}`)
}
