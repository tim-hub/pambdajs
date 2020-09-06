# PambdaJS - Empower Multi-Process Easily
[![npm version](https://badge.fury.io/js/pambdajs.svg)](https://www.npmjs.com/package/pambdajs) ![TEST Passing](https://github.com/tim-hub/pambdajs/workflows/Test/badge.svg) [![codecov](https://codecov.io/gh/tim-hub/pambdajs/branch/master/graph/badge.svg)](https://codecov.io/gh/tim-hub/pambdajs)
>  Parallelized Lambda, a wrapper to help run lambda/anonymous function in parallel easily. 

PambdaJS is to orchestrate different child process to finish one heavy iteration work.
- make multi process programming easily
- gain better performance through empowering multi core CPU

**Start to use PambdaJS**

```javascript
import pambda from 'pambdajs';
const p = await pambda.init(5);

data = [1,2,3];
const heavyWork = (x) => {
    return x+x;
}
// original single process way
const singleProcess = () => {
  data.map(heavyWork);
}

// PambdaJS multi process way
const pambdaProcess = async () => {
  await p.map(heavyWork, data);
}
```
 
## Features
Run your own anonymous functions in Parallel.
- map
- filter
- reduce

## Limit
The lambda function itself has to be a pure function, 
and it has to use only node build-in packages.

for example:
```javascript
// good
const heavyWork = (x) => {
    return x+x;
}


// bad
const sumItSelf = (x) => {
    return x + x;
}

const heavyWork = (x) => {
    return sumItSelf(x)
}
```

## Performance
- PambdaJS can save up to 55% of processing time. (Diagram ↓)

![PambdaJS performance](https://i.imgur.com/F2HfHwF.png)
As you can see the above. 
- The best case to repeat summing 10k number 100k times, 
is to spawn 5 child process, and **it saves more than hald of time than single process.**

- Besides, for simple work, multi process does not help at all.
So make sure usig PambdaJS for heavy work only. ([more diagrams](https://pambdajs-performance.vercel.app/))

## FAQ
- Why not use child process directly?
> Yeah, why not. child_process is the native module of Node, if you seek better flexibility, use child_process.
However, if you want to make your life easier, trust me use PambdaJS, 
you do not need to worry about the message between child and parent process anymore.

- Does it run on browser as well?
> No, PambdaJS is a tool for Node environment, not for browser, 
because browser does not support multi-process, 
but you can try [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) which is multi-thread solution.
>or Gpu.js which is using GPU instead of CPU for getting better performance.


## Reference

- [What is Lambda Function](https://stackoverflow.com/questions/16501/what-is-a-lambda-function)
- Other solutions for better performance
    - [Child Process](https://nodejs.org/api/child_process.html)
    - [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) for multi threading. **We all love MDN!!!**
    - [Gpu.js](https://gpu.rocks/)
- Relative Repos
    - [PambdaJS Playground](https://github.com/tim-hub/pambdajs-playground) - the place to use pambdajs to run some simple sample work
    - [PambdaJS Performance Analyse](https://github.com/tim-hub/pambdajs-performance) - using Chart.js to generate the diagrams
- [Code of conduct](./code-of-conduct.md)
- [Contributing](./CONTRIBUTING.md)
