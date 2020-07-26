import { Orchestrator } from './Orchestrator'
import * as os from 'os'

describe('to test orchestrator', () => {
  let orch: Orchestrator
  const data1 = ['a', 'b', 'c', 'D', 'e']

  beforeAll(
    () => {
      orch = new Orchestrator(4)
    }
  )

  it('orchestrate/slice should work well', ()=>{
    const orch1 = new Orchestrator(4);
    expect(orch1.processCount).toEqual(4);

    const orch2 = new Orchestrator();
    expect(orch2.processCount).toEqual(os.cpus().length);

  })

  it('test map function with a function with name', async () => {


    function upper (a: string) {
      return a.toUpperCase()
    }
    const data = ['a', 'b', 'c', 'D', 'e']

    const r = await orch.map(upper, data)
    console.log(r, 'r');
  })

})
