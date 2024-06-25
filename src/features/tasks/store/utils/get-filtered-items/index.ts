import type { FilterStatus, Item } from './types'

export default <T extends Item>({ originItems, status = 'all' }: { originItems: T[]; status: FilterStatus }) => {
  const map = {
    all: originItems,
    completed: originItems.filter(item => item.completed),
    uncompleted: originItems.filter(item => !item.completed)
  }

  return map[status as FilterStatus]
}
