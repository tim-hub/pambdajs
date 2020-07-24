import * as os from 'os'
import { ChildProcess, fork, execSync } from 'child_process'
import { rejects } from 'assert'

interface IResult {
  index: number;
  data: any;
}

export class Orchestrator {
  modulePath: string = 'src/Processor/childProcessWorker.js'
  processCount: number = os.cpus().length
  children: ChildProcess[] = []
  results: IResult[] = []

  constructor(processCount = os.cpus().length, modulePath?: string) {
    this.processCount = processCount

    if (modulePath) {
      this.modulePath = modulePath
    }
  }

  public map(pureFunction: Function, data: any[]) {
    this.results = new Array(data.length)
    for (let i = 0; i < this.results.length; i++) {
      const child = this.fork(pureFunction, i, i.toString())
      child.send({ data: data[i] })
      // listen for messages from forked process
      child.on('message', async (message) => {
        console.log(`Result received from worked ${message.data}`)
        this.results[message.index] = message.data
        if (!child.killed) {
          process.kill(child.pid)
        }
      })
    }
    return this.results
  }

  public async poll(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        const inter = setInterval(
          () => {
            if (this.children?.length && !this.children.find(
              ps => {
                !ps.killed
              }
            )) {
              // console.log(this.results)
              resolve(true)
            }
          }, 1
        )
        setTimeout(() => {
          clearInterval(inter)
          reject()
        },100)
      }
    )
  }

  public cleanup() {

  }

  private fork(pureFunction: Function, childIndex: number, customProcessID: string = ''): ChildProcess {
    const childProcess = fork(this.modulePath, [customProcessID], {
      env: {
        INDEX: childIndex.toString(),
        PROCESS_ID: customProcessID,
        FUNCTION: pureFunction.toString(),
        FUNCTION_NAME: pureFunction.name
      },
      silent: false // false stdin, stdout, and stderr of the child will be inherited from the parent
    })

    childProcess.on('close', (code: string) => {
      console.log('process quit with code ' + code)
    })

    this.children.push(childProcess)
    return childProcess
  }

}
