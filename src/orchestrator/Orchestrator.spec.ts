import { Orchestrator } from './Orchestrator'
import * as os from 'os'

describe('to test orchestrator', () => {
  let orch: Orchestrator
  const data1 = ['a', 'b', 'c', 'D', 'e']

  beforeAll(() => {
    orch = new Orchestrator(4)
  })

  it('orchestrate/slice should work well', () => {
    const orch1 = new Orchestrator(4)
    expect(orch1.processCount).toEqual(4)

    const orch2 = new Orchestrator()
    expect(orch2.processCount).toEqual(os.cpus().length)
  })

  it('test map function with a function with name', async () => {
    // function names are tested in worker
    function upper(a: string) {
      return a.toUpperCase()
    }

    const data = data1
    const r = await orch.map(upper, data)
    expect(r).toEqual(data.map((d) => upper(d)))
  })

  it('map with one element', async () => {
    function upper(a: string) {
      return a.toUpperCase()
    }

    const data = ['a']
    const r = await orch.map(upper, data)
    expect(r).toEqual(data.map((d) => upper(d)))
  })

  it('map with 0 element', async () => {
    function upper(a: string) {
      return a.toUpperCase()
    }

    const data: any[] = []
    const r = await orch.map(upper, data)
    expect(r).toEqual(data.map((d) => upper(d)))
  })

  it('test filter function ', async () => {
    const uppperFilter = (a: string) => {
      return a.toUpperCase() === a
    }
    const data = data1
    const r = await orch.filter(uppperFilter, data)
    expect(r).toEqual(data.filter(uppperFilter))
  })

  it('filter with one element', async () => {
    const uppperFilter = (a: string) => {
      return a.toUpperCase() === a
    }
    const data = ['a']
    const r = await orch.filter(uppperFilter, data)
    expect(r).toEqual(data.filter(uppperFilter))

    const data1 = ['A']
    const r1 = await orch.filter(uppperFilter, data1)
    expect(r1).toEqual(data1.filter(uppperFilter))
  })

  it('filter with 0 element', async () => {
    const uppperFilter = (a: string) => {
      return a.toUpperCase() === a
    }
    const data: any[] = []
    const r = await orch.filter(uppperFilter, data)
    expect(r).toEqual(data.filter(uppperFilter))
  })
})
