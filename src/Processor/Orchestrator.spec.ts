import { Orchestrator } from './Orchestrator'

describe('to test orchestrator', () => {
  let orch: Orchestrator

  beforeAll(
    () => {
      orch = new Orchestrator()
    }
  )

  it('test map function with a function with name', async () => {
    orch = new Orchestrator()

    function upper (a: string) {
      return a.toUpperCase()
    }
    const data = ['a', 'b', 'c', 'E']

    orch.map(upper, data)
    const r = await orch.poll();
    if (r) {
      console.log(orch.results);
    }
  })

})
