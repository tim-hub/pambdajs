/**
 * I am a hard working worker, lol
 * @param data:any[]
 * @returns {{data: any[], index: string}}
 */
const childProcessWorker = (data) => {
  if (process.argv[2]) {
    console.log(`Child Process ${process.argv[2]} executed`)
  } else {
    console.log('Child Process executed')
  }

  const theFunction = process.env.FUNCTION
  const theFunctionName = process.env.FUNCTION_NAME
  const theIndex = process.env.INDEX

  const evalString = `
  const params = ${JSON.stringify(data)};
` + theFunction + `;
  params.map((p) => (
    ${theFunctionName}(p)
  ));
  `// do the loop in an independent worker

  console.log(evalString)
  const result = eval(evalString)
  console.log(result)
  return {
    index: theIndex,
    data: result,
  }
}

// receive message from master process
process.on('message', async (message) => {
  const result = childProcessWorker(message.data)
  // send response to master process
  process.send(result)
})


