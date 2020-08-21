/**
 * I am a hard working worker, give me your CPU processor, lol
 * todo, minimise this function for better performance
 * @returns {{data: any[], index: string}}
 */

const log = (...x) => {
  if (process.env.LOG_LEVEL === 'debug') {
    console.log(...x)
  }
}

const childProcessWorker = (data) => {
  //
  // if (process.argv[2]) {
  //   log(`Child Process ${process.argv[2]} executed`)
  // } else {
  //   log('Child Process executed')
  // }

  const theFunction = process.env.FUNCTION
  const theFunctionName = process.env.FUNCTION_NAME ? process.env.FUNCTION_NAME : 'fun'
  const theIndex = process.env.INDEX
  const theWorkType = process.env.WORK_TYPE

  let evalString = `const params = ${JSON.stringify(data)};`
    + `const ${theFunctionName} = ` + theFunction ;
  if (theWorkType === 'FILTER') {
    evalString += `; Array.prototype.filter.call(params, ${theFunctionName});`;
  } else if (theWorkType === 'REDUCE') {
    evalString +=  `; Array.prototype.reduce.call(params, ${theFunctionName});`
  } else {
    // by default MAP
    evalString +=  `; Array.prototype.map.call(params,${theFunctionName});`
  }

  const result = eval(evalString)
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


