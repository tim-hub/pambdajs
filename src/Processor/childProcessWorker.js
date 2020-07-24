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
    ${theFunctionName}(params);`

  console.log(evalString)
  const result = eval(evalString)
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


