<template>
  <div :class="$style['add-task']">
    <input v-model="title" type="text" placeholder="Task Title" />
    <textarea v-model="description" placeholder="Task Description"></textarea>
    <button @click="addNewTask">Add Task</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const title = ref('')
const description = ref('')

const addNewTask = async () => {
  if (title.value.trim() && description.value.trim()) {
    const newTask = {
      title: title.value,
      description: description.value,
      completed: false,
      createdAt: new Date().toISOString()
    }
    await store.dispatch('tasks/addTask', newTask)
    title.value = ''
    description.value = ''
  } else {
    alert('Please fill in both the title and description')
  }
}
</script>

<style module>
.add-task {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-items: center;
}

.add-task input,
.add-task textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-task button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #0056b3;
}
</style>
