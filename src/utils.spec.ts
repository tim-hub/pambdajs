import { functionToSource } from './utils'
import { fork } from 'child_process';

describe('test transfer function to source', () => {

  it('test the fucntion', async () => {
    const src = functionToSource(
      () => {console.log('i am a cb')},
      process.env
    )
    // console.log(src)
    // @ts-ignore
    process.send(
      JSON.stringify({ data: src })
    )
    process.on('message', (m)=>{
      console.log(m);
    })
  })
})
