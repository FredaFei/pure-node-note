/**
 * cookie-parse
 */

const cookie_parse = require('cookie')
module.exports = (ctx) => {
    let { req,reqCtx,resCtx,res} = ctx
    let {cookie} = req.headers
    let {url} = req
    let cookieObj = cookie_parse.parse(cookie || '')
    return Promise.resolve({
        then: (resolve, reject) => {
            let cookieStr = time => `authord=hi;Max-Age=${time}`
            //login
            if (cookieObj['authord']) {
                resCtx.hasUser = true
                res.setHeader('Set-Cookie', cookieStr(3600))
            }
            // 路由命中白名单
            const whiteNameList = ['/name_freda']
            if (whiteNameList.indexOf(url) > -1) {
                res.setHeader('Set-Cookie', cookieStr(3600))
            }
            //logout
            if (url === '/logout') {
                res.setHeader('Set-Cookie', cookieStr(0))
            }
            resolve()
        }
    })
}
