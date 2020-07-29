import { slice } from './slice'

describe('test slice', () => {
  const data1 = ['a', 'b', 'c', 'D', 'e']
  const count = 4

  it('5 elements', async () => {
    const r = slice(data1, count)
    expect(r).toEqual(
      [
        ['a'],
        ['b'],
        ['c'],
        ['D', 'e']
      ]
    )
  })

  it('slice with only 2 elements ', async () => {
    const r = slice(data1.slice(0, 2), count)
    expect(r).toEqual(
      [
        ['a'],
        ['b']
      ]
    )
  })
  it('slice to 2 parts ', async () => {
    const r = slice(data1, 2)
    expect(r).toEqual(
      [
        ['a', 'b'],
        ['c', 'D', 'e']
      ]
    )
  })
})
