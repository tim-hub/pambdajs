import { Orchestrator } from './orchestrator/Orchestrator'
import { forkAProcess } from './utils/fork'
import { cpus } from 'os'
import { resolve } from 'path'

export const fork = forkAProcess
export const init = (processCount?: number): Orchestrator => {
  const theProcessCount = processCount ? processCount : cpus ? cpus().length : 2
  const workerPath = resolve(__dirname, './worker/childProcessWorker.js')
  return new Orchestrator(theProcessCount, workerPath)
}
