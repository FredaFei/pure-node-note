/**
 * api-server
 *
 */
const router = require('./ajax')

module.exports = ctx => {
  let { reqCtx, resCtx } = ctx
  let { pathname, method } = reqCtx
  return Promise.resolve({
    then: (resolve, reject) => {
      if (pathname.match('.action')) {
        return router.routes(ctx).then(val => {
          if (val) {
            resCtx.body = JSON.stringify(val)
            resCtx.header = Object.assign(resCtx.header, {
              'Content-Type': 'application/json'
            })
          }
          resolve()
        },err=>{
            console.log(`${err}`)
        })
      }
      resolve()
    }
  })
}
