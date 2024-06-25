<template>
  <div :class="$style['sort-options']">
    <p>Sort by:</p>
    <span
      :class="option.classes"
      v-for="option in optionInfos"
      :key="option.id"
      @click="onOptionClick(option.name)">
        {{ option.name }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import type { SortOption } from '@/types'

interface Props {
  options: SortOption[];
  activeOption: SortOption;
}

const $style = useCssModule()
const emit = defineEmits(['sort'])
const props = defineProps<Props>()

const optionInfos = computed(() => props.options.map((option) => ({
  id: option,
  name: option,
  classes: option === props.activeOption ? { [$style.active]: true } : {}
})))

const onOptionClick = (option: string) => {
  emit('sort', option)
}

</script>
<style module>
  .sort-options {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  .sort-options span {
    cursor: pointer;
    padding: 0.25rem;
  }

  .sort-options span:hover {
    color: aqua;
  }

  .sort-options span.active {
    color: green;
  }
</style>
