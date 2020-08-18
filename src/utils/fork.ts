import { ChildProcess, fork } from 'child_process'
// import logger from '../logger'

export const forkAProcess = (
  modulePath: string,
  pureFunction: Function,
  childIndex: number,
  customProcessID: string = ''
): ChildProcess => {
  let fun = pureFunction
  const childProcess = fork(modulePath, [customProcessID], {
    env: {
      INDEX: childIndex.toString(),
      PROCESS_ID: customProcessID,
      FUNCTION: fun.toString(),
      FUNCTION_NAME: fun.name,
      LOG_LEVEL: process.env.LOG_LEVEL,
    },
    silent: false, // false stdin, stdout, and stderr of the child will be inherited from the parent
  })

  childProcess.on('close', (code: string) => {
    // logger.debug('process quit with code ' + code)
  })
  return childProcess
}
