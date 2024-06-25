import getFilteredItems from '.'
import type { Item, FilterStatus } from './types'

type MockItem = Item & { id: number }

describe('getFilteredItems', () => {
  const items: MockItem[] = [
    { id: 1, completed: true },
    { id: 2, completed: false },
    { id: 3, completed: true },
    { id: 4, completed: false }
  ]

  test.each<[FilterStatus, number[]]>([
    ['all', [1, 2, 3, 4]],
    ['completed', [1, 3]],
    ['uncompleted', [2, 4]]
  ])('filters items by %s status', (status, expectedIds) => {
    const result = getFilteredItems({ originItems: items, status })
    const resultIds = result.map(item => item.id)
    expect(resultIds).toEqual(expectedIds)
  })
})
