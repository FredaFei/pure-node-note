/**
 * body-parse
 * 处理 request: body
 */

module.exports = (ctx) => {
    let {req, reqCtx} = ctx
    let {method} = ctx.req
    method = method.toLowerCase()
    return Promise.resolve({
        then: (resolve, reject) => {
            if (method === 'post'||method === 'put') {
                let data = []
                req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    reqCtx.body = JSON.parse(Buffer.concat(data).toString())
                    resolve()
                }).on('err',(err)=>{
                    reject(err)
                })
            } else {
                resolve()
            }
        }
    })
}