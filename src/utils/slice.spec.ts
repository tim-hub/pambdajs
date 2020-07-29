import { slice } from './slice'

describe('test utils', () => {

  const data1 = ['a', 'b', 'c', 'D', 'e']
  const count = 4
  it('test the orchestrate', async () => {

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
})
