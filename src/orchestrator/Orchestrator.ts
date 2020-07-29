import * as os from 'os'
import { ChildProcess, fork, execSync } from 'child_process'
import { slice } from '../utils/slice'
import * as path from 'path'
import { forkAProcess } from '../utils/fork'
import logger from '../logger'

interface IResult {
  index: number;
  data: any;
}

export class Orchestrator {
  modulePath: string = path.resolve('src/worker/childProcessWorker.js')
  processCount: number = os.cpus().length

  constructor(processCount = os.cpus().length, modulePath?: string) {
    this.processCount = processCount

    if (modulePath) {
      this.modulePath = modulePath
    }
    logger.debug(`start a new orchestrator **${this.modulePath}** with process count at ` + this.processCount)
  }

  public async map(pureFunction: Function, data: any[]): Promise<any[]> {
    if (data?.length <= 0) {
      return data
    }
    const slices = this.slice(data)
    logger.debug('slices', slices)
    const resultParts = await this._map(pureFunction, slices)
    const results: any[] = []
    resultParts.forEach((p) => {
      results.push(...p)
    })
    return results
  }

  public async reduce(reducerPureFunction: Function, data: any[]): Promise<any> {

  }

  /**
   *
   * @param pureFunction
   * @param data  is a 2 dimension of array with same amount of process count
   * @private
   */
  private async _map(pureFunction: Function, data: Array<any[]>): Promise<any[]> {
    const results = new Array(data.length)
    await Promise.all(
      data.map(
        async (partOfData, i) => {
          const r = await this.spawn(i, pureFunction, partOfData)
          // keep the result in order
          results[r.index] = r.data
          return r
        }
      )
    )
    logger.debug(results, 'results of _map')
    return results
  }

  /**
   * return a 2 dimension array
   * @param data
   */
  private slice(data: any[]): Array<any[]> {
    return slice(data, this.processCount)
  }

  /**
   * to spawn a child process worker
   * @param i
   * @param pureFunction
   * @param data
   */
  private async spawn(i: number, pureFunction: Function, data: any[]): Promise<IResult> {
    return new Promise((resolve, reject) => {
      const child = this.fork(pureFunction, i, i.toString())
      child.send({ data: data }, (error => {
        if (error) {
          reject(error)
        }
      }))
      // listen for messages from forked process
      child.on('message', async (message, senderHandler) => {
        logger.debug(`Result received from worked ${message.data}`)
        if (!child.killed) {
          process.kill(child.pid)
        }
        resolve(message)
      })
    })
  }

  private fork(pureFunction: Function, childIndex: number, customProcessID: string = ''): ChildProcess {
    return forkAProcess(this.modulePath, pureFunction, childIndex, customProcessID)
  }
}
