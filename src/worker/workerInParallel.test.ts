import * as path from 'path'
import { ChildProcess, fork } from 'child_process'

describe('work in paraller properly', () => {

  const data1 = ['a', 'b', 'c', 'D', 'e']
  const count = 4

  const thePath = path.resolve('src/worker/childProcessWorker.js')
  let process0: ChildProcess

  beforeAll(() => {

    function upper(a: string) {
      return a.toUpperCase()
    }

    process0 = fork(thePath, ['0'], {
      env: {
        INDEX: '0',
        PROCESS_ID: '0',
        FUNCTION: upper.toString(),
        FUNCTION_NAME: upper.name
      },
      silent: false // false stdin, stdout, and stderr of the child will be inherited from the parent
    })

    process0.on('close', (code: string) => {
      console.log('process quit with code ' + code)
    })
  })

  it('test to fork a child process to work properly', async () => {
    const r = await new Promise(
      ((resolve, reject) => {
        process0.send({ data: data1 }, (error => {
          if (error) {
            reject(error)
          }
        }))
        // listen for messages from forked process
        process0.on('message', async (message, senderHandler) => {
          console.log(`Result received from worked ${message.data}`)
          if (!process0.killed) {
            process.kill(process0.pid)
          }
          resolve(message)
        })
      })
    )
    console.log(r)
  })
})
