<template>
  <div :class="$style['task-card']">
    <div :class="$style['task-header']">
      <p :class="$style['task-title']">{{ task.title }}</p>
      <div :class="$style['task-actions']">
        <img :class="$style.status" :src="completeImageSource" @click="toggleCompletion" />
        <img :class="$style.delete" src="@/assets/delete.svg" @click="onDeletionClick(task.id)" />
      </div>
    </div>
    <div :class="$style['task-description']">
      <p v-if="!isEditing" @click="onDescriptionClick">{{ task.description }}</p>
      <textarea
        v-else
        ref="descriptionRef"
        v-model="editableDescription"
        maxlength="200"
        required
        @blur="onDescriptionBlur"
        @keyup.enter="onDescriptionSave"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'

interface Props {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['update-task', 'delete-task'])

const isEditing = ref(false)
const editableDescription = ref(props.task.description)
const descriptionRef = ref<HTMLInputElement | null>(null)
const onDescriptionClick = () => {
  isEditing.value = true
  nextTick(() => {
    if (!descriptionRef.value) return
    descriptionRef.value?.focus()
  })
}
const onDescriptionSave = () => {
  if (editableDescription.value !== props.task.description) {
    emit('update-task', {
      ...props.task,
      description: editableDescription.value
    })
  }
  isEditing.value = false
}

const onDescriptionBlur = () => {
  isEditing.value = false
}

const toggleCompletion = () => {
  emit('update-task', {
    ...props.task,
    completed: !props.task.completed
  })
}

const onDeletionClick = (id: string) => {
  emit('delete-task', id)
}

const completeImageSource = computed(() => props.task.completed ? 'src/assets/check.svg' : 'src/assets/uncheck.svg')

watch(() => props.task.description, () => {
  editableDescription.value = props.task.description
})
</script>
<style module>
  .task-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 1rem 0;
    position: relative;
    background-color: #d2d2d7;
    height: 200px;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
  }

  .task-title {
    color: #333;
    text-align: left;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
    margin: 4px 4px 0;
    flex: 1;
  }

  .task-description {
    flex: 1;
    margin-top: 4px;
    padding: 4px;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .task-description p, .task-description textarea {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
    text-align: left;
  }

  .task-description textarea {
    resize: none;
  }

  .task-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-actions img {
    flex: 1;
    margin: 0 0.25rem;
  }

  .status {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .delete {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
</style>
