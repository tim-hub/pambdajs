import { init } from '../src/pambdajs'
import { Orchestrator } from '../src/orchestrator/Orchestrator'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('class can be instantiable', () => {
    expect(init()).toBeInstanceOf(Orchestrator)
  })
})
