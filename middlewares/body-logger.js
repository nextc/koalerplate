module.exports = bodyLogger

function bodyLogger() {
  return async (ctx, next) => {
    console.log(ctx.request.body)
    await next()
  }
}
