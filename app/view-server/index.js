/**
 * ejs render
 */

const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const urlrewrite = require('./urlrewrite')

module.exports = (ctx) => {
    let {reqCtx, resCtx} = ctx
    let {pathname} = reqCtx
    return Promise.resolve({
        then: (resolve, reject) => {
            if (pathname.match('action') || pathname.match(/\./)) { // 仅对前端路由做处理
                resolve()
            } else {
                let viewPath = path.resolve(__dirname, 'ejs')
                const ejsName = urlrewrite[pathname]
                if (ejsName) {
                    let layoutPath = path.resolve(viewPath, 'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath, 'utf8')
                    // new Function
                    let render = ejs.compile(layoutHtml, {
                        compileDebug: true,
                        filename: layoutPath
                    })
                    let html = render({
                        viewName: ejsName,
                        hasUser: resCtx.hasUser
                    })
                    resCtx.header = Object.assign(resCtx.header, {
                        'Content-Type': 'text/html'
                    })
                    resCtx.body = html
                    resCtx.statusCode = 200
                    resolve()
                } else {
                    // 路由重定向处理
                    resCtx.header = Object.assign(resCtx.header, {
                        'Location': '/'
                    })
                    resCtx.statusCode = 302
                    resCtx.statusMessage = 'redirect'
                    resCtx.body = ''
                    resolve()
                }
            }
        }
    })
}
