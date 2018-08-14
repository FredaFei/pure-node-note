/**
 * url-parse
 * 处理 request: query + body + method
 */
const Url = require('url')
module.exports = (ctx) => {
    let {reqCtx} = ctx
    let {url, method} = ctx.req
    method = method.toLowerCase()
    let urlObj = Url.parse(url,true)
    Object.assign(reqCtx, {
        pathname: urlObj['pathname'],
        query: urlObj['query'],
        method
    })
    return Promise.resolve({
        then: (resolve, reject) => {
            if (method === 'post') {
                let data = []
                ctx.req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    reqCtx.body = JSON.parse(Buffer.concat(data).toString())
                    resolve()
                })
            } else {
                resolve()
            }
        }
    })
}
