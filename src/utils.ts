export const functionToSource = (cb: Function, env: any) => {
  return `
  process.on(
    "message",
     function(e) {
      global.env = ${env};
      process.send(
        JSON.stringify(
          (${cb.toString()})(JSON.parse(e).data)
        )
      );
  })`
}
