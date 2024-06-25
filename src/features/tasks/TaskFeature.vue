<template>
  <sort-options :options="SORT_OPTIONS" :activeOption="sortBy" @sort="onSort" />
  <div :class="$style['task-list']">
    <task-card
      v-for="task in paginatedTasks"
      :key="task.id"
      :task="task"
      @update-task="updateTask"
      @delete-task="deleteTask"
    />
  </div>
  <div v-if="loading" class="loading">Loading...</div>
  <div :class="$style.pagination">
    <button @click="onPreviousClick" :disabled="currentPage === 1">
      <img :class="$style.arrow" src="@/assets/arrow-left.svg" alt="Previous page" />
    </button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="onNextClick" :disabled="currentPage === totalPages">
      <img :class="$style.arrow" src="@/assets/arrow-right.svg" alt="Next page" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Task } from '@/features/tasks/types'
import TaskCard from '@/features/tasks/components/TaskCard'
import SortOptions from '@/components/SortOptions'
import { SORT_OPTIONS } from './constants'

const { dispatch, getters } = useStore()
const loading = ref(false)
const currentPage = computed(() => getters['tasks/currentPage'])
const tasks = computed(() => getters['tasks/tasks'])
const pageSize = computed(() => getters['tasks/pageSize'])
const totalPages = computed(() => {
  return Math.ceil(tasks.value.length / pageSize.value)
})
const paginatedTasks = computed(() => getters['tasks/paginatedTasks'])
const sortBy = computed(() => getters['tasks/sortBy'])
const updateTask = (task: Task) => dispatch('tasks/updateTask', task)
const deleteTask = (id: number) => dispatch('tasks/deleteTask', id)
const setPage = (page) => dispatch('tasks/setPage', page)
const onPreviousClick = () => {
  if (currentPage.value > 1) {
    setPage(currentPage.value - 1)
  }
}
const onNextClick = () => {
  if (currentPage.value < totalPages.value) {
    setPage(currentPage.value + 1)
  }
}

const onSort = (option: string) => dispatch('tasks/setSortBy', option)

onMounted(async () => {
  loading.value = true
  dispatch('tasks/fetchTasks')
  loading.value = false
})
</script>
<style module>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem auto 0;
    max-width: 600px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .pagination button {
    margin: 0 0.5rem;
    background-color: transparent;
  }

  .arrow {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 786px) {
    .task-list {
      max-width: 400px;
    }
  }

  @media (max-width: 400px) {
    .task-list {
      max-width: 300px;
    }
  }
</style>