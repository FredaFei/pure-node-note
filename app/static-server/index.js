const fs = require('fs')
const path = require('path')
const mime = require('mime')
const STATIC = './client'

let getPath = pathname => path.resolve(process.cwd(), `${STATIC}`, `.${pathname}`)

const staticServer = (ctx) => {
    let {reqCtx, resCtx} = ctx
    let {pathname} = reqCtx
    return new Promise((resolve, reject) => {
        if (pathname.match(/\./) && !pathname.match('.action')) {
            if (pathname === '/') {
                pathname = '/index.html'
            }
            let _path = getPath(pathname)
            resCtx.header = Object.assign(resCtx.header, {
                'Content-Type': mime.getType(_path)
            })
            fs.readFile(_path, (err, data) => {
                if (err) {
                    resCtx.body = `NOT FOUND ${err.stack}`
                }
                resCtx.body = data
                resolve()
            })
        } else {
            resolve()
        }
    })
}
module.exports = staticServer
