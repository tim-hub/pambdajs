/**
 * I am a hard working worker, give me your CPU processor, lol
 * @returns {{data: any[], index: string}}
 */

const log = (...x) => {
  console.log(...x)
}

const childProcessWorker = (data) => {

  if (process.argv[2]) {
    log(`Child Process ${process.argv[2]} executed`)
  } else {
    log('Child Process executed')
  }

  const theFunction = process.env.FUNCTION
  const theFunctionName = process.env.FUNCTION_NAME ? process.env.FUNCTION_NAME : 'fun'
  const theIndex = process.env.INDEX


  const evalString = `
  const params = ${JSON.stringify(data)};
` + `const ${theFunctionName} = ` + theFunction + `;
  params.map((p) => (
    ${theFunctionName}(p)
  ));
  `// do the loop in an independent worker

  log('eval string', evalString)
  const result = eval(evalString)
  log(result)
  return {
    index: theIndex,
    data: result
  }
}

// receive message from master process
process.on('message', async (message) => {
  const result = childProcessWorker(message.data)
  // send response to master process
  process.send(result)
})


