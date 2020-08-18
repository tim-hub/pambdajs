import { ChildProcess, fork } from 'child_process'
// import logger from '../logger'

export enum WORK_TYPE {
  MAP = 'MAP',
  FILTER = 'FILTER',
  REDUCE = 'REDUCE',
}

export const forkAProcess = (
  modulePath: string,
  pureFunction: Function,
  childIndex: number,
  customProcessID: string = '',
  workType: WORK_TYPE = WORK_TYPE.MAP
): ChildProcess => {
  let fun = pureFunction
  const childProcess = fork(modulePath, [customProcessID], {
    env: {
      INDEX: childIndex.toString(),
      PROCESS_ID: customProcessID,
      FUNCTION: fun.toString(),
      FUNCTION_NAME: fun.name,
      LOG_LEVEL: process.env.LOG_LEVEL,
      WORK_TYPE: workType,
    },
    silent: false, // false stdin, stdout, and stderr of the child will be inherited from the parent
  })

  childProcess.on('close', (code: string) => {
    // logger.debug('process quit with code ' + code)
  })
  return childProcess
}
