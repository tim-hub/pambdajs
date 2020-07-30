import Orchestrator from '../src/pambda.js'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('class can be instantiable', () => {
    expect(new Orchestrator()).toBeInstanceOf(Orchestrator)
  })
})
