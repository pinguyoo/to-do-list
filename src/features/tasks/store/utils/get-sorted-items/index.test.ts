import type { Item, SortOption } from './types'
import getSortedItems from '.'

const generateItems = (dates: string[]): Item[] => {
  return dates.map(date => ({ createdAt: date }))
}

const sortByDate = (dates: string[], order: 'asc' | 'desc'): string[] => {
  return [...dates].sort((a, b) => {
    if (order === 'asc') {
      return new Date(a).getTime() - new Date(b).getTime()
    }
    return new Date(b).getTime() - new Date(a).getTime()
  })
}
describe('getSortedItems', () => {
  const dates = ['2023-06-24T10:00:00Z', '2023-06-23T10:00:00Z', '2023-06-25T10:00:00Z']
  const tasks = generateItems(dates)

  test.each([
    ['newest', sortByDate(dates, 'desc')],
    ['oldest', sortByDate(dates, 'asc')]
  ])('sorts tasks by %s date', (sortBy, expectedDates) => {
    const sorted = getSortedItems({ originItems: tasks, sortBy: sortBy as SortOption })
    const sortedDates = sorted.map(task => task.createdAt)
    expect(sortedDates).toEqual(expectedDates)
  })

  test('returns original order if sortBy is invalid', () => {
    const sorted = getSortedItems({ originItems: tasks, sortBy: 'invalid' as SortOption })
    const originalDates = tasks.map(task => task.createdAt)
    const sortedDates = sorted.map(task => task.createdAt)
    expect(sortedDates).toEqual(originalDates)
  })
})
