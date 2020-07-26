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
    const data = ['a', 'b', 'c', 'D']

    const r = await orch.map(upper, data)
    console.log(r, 'r');
  })

})
