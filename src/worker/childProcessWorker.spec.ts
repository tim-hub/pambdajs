import * as path from 'path'
import logger from '../logger'
import { forkAProcess, WORK_TYPE } from '../utils/fork'

/**
 * similar to orchestrator fork and spawn function, here to use for testing child worker js
 * @param fun
 * @param thePath
 * @param data
 * @param workType
 */
const testFork = async (
  fun: Function,
  thePath: string,
  data: any[],
  workType: WORK_TYPE = WORK_TYPE.MAP
) => {
  const thePureFunction = fun
  const process0 = forkAProcess(thePath, thePureFunction, 0, '0', workType)
  return new Promise((resolve, reject) => {
    process0.send({ data: data }, (error) => {
      if (error) {
        reject(error)
      }
    })
    process0.on('message', async (message, senderHandler) => {
      logger.debug(`Result received from worked ${message.data}`)
      if (!process0.killed) {
        process.kill(process0.pid)
      }
      resolve(message)
    })
  })
}

describe('work in paraller properly', () => {
  const data1 = ['a', 'b', 'c', 'D', 'e']
  const count = 4

  const thePath = path.resolve(__dirname, './childProcessWorker.js')

  it('test to fork a child process to work properly', async () => {
    const upper = (a: string) => {
      return a.toUpperCase()
    }

    const r = await testFork(upper, thePath, data1)
    // @ts-ignore
    const data = r.data
    // @ts-ignore
    expect(parseInt(r.index, 10)).toBeGreaterThanOrEqual(0)
    expect(data).toEqual(data1.map((d) => upper(d)))
  })

  it('test to fork a child process to work properly with old way function without name', async () => {
    const upper = function (a: string) {
      return a.toUpperCase()
    }
    const r = await testFork(upper, thePath, data1)
    // @ts-ignore
    const data = r.data
    // @ts-ignore
    expect(parseInt(r.index, 10)).toBeGreaterThanOrEqual(0)
    expect(data).toEqual(data1.map((d) => upper(d)))
  })

  it('test to fork a child process to work properly with old way function with name', async () => {
    function upper(a: string) {
      return a.toUpperCase()
    }

    const r = await testFork(upper, thePath, data1)
    // @ts-ignore
    const data = r.data
    // @ts-ignore
    expect(parseInt(r.index, 10)).toBeGreaterThanOrEqual(0)
    expect(data).toEqual(data1.map((d) => upper(d)))
  })

  it('test to fork a child process to work properly with anonymous function', async () => {
    const r = await testFork(
      (a: string) => {
        return a.toUpperCase()
      },
      thePath,
      data1
    )
    // @ts-ignore
    const data = r.data
    // @ts-ignore
    expect(parseInt(r.index, 10)).toBeGreaterThanOrEqual(0)
    expect(data).toEqual(data1.map((d) => d.toUpperCase()))
  })

  it('filter, test to fork a child process to', async () => {
    const upperFilter = (a: string) => {
      return a.toUpperCase() === a
    }
    const r = await testFork(upperFilter, thePath, data1, WORK_TYPE.FILTER)
    // @ts-ignore
    const data = r.data
    // @ts-ignore
    expect(parseInt(r.index, 10)).toBeGreaterThanOrEqual(0)
    expect(data).toEqual(data1.filter(upperFilter))
  })
})
