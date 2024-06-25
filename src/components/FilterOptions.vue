<template>
  <div :class="$style['filter-options']">
    <p>Filter by:</p>
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
import type { FilterStatus } from '@/types'

interface Props {
  options: FilterStatus[];
  activeOption: FilterStatus;
}

const $style = useCssModule()
const emit = defineEmits(['filter'])
const props = defineProps<Props>()

const optionInfos = computed(() => props.options.map((option) => ({
  id: option,
  name: option,
  classes: option === props.activeOption ? { [$style.active]: true } : {}
})))

const onOptionClick = (option: string) => {
  emit('filter', option)
}

</script>
<style module>
  .filter-options {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  .filter-options span {
    cursor: pointer;
    padding: 0.25rem;
  }

  .filter-options span:hover {
    color: aqua;
  }

  .filter-options span.active {
    color: green;
  }
</style>
