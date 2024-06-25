import type { Item, SortOption } from './types'

export default <T extends Item>({ originItems = [], sortBy }: { originItems: T[]; sortBy: SortOption }) => {
  const sortedTasks = [...originItems]
  const sortedCompareFnMap = {
    newest: (a: T, b: T) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    oldest: (a: T, b: T) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  }

  const compareFn = sortedCompareFnMap[sortBy]
  if (!compareFn) return sortedTasks
  return sortedTasks.sort(compareFn)
}
