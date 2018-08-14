const staticServer = require('./static-server')
const urlParse = require('./url-parse')
const apiServer = require('./api')

class App {
    constructor() {
        this.middlewareArr = []
        this.middlewareChain = Promise.resolve()
    }
    use(middle){
        this.middlewareArr.push(middle)
    }
    composeMiddle(context){
        let {middlewareArr} = this
        for(let middleware of middlewareArr){
            this.middlewareChain = this.middlewareChain.then(()=>{
                return middleware(context)
            })
        }
        return this.middlewareChain
    }

    initServer() {
        return (request, response) => {
            let {url, method} = request
            let context = {
                req: request,
                reqCtx: {
                    body: '', // post请求数据
                    pathname: '',
                    query: {}
                },
                res: response,
                resCtx: {
                    hasUser: false, // 识别用户
                    statusCode: 200,
                    statusMessage: 'resolve ok',
                    header: {},
                    body: {}
                }
            }
            this.composeMiddle(context).then(() => {
                let {body,header,statusCode,statusMessage} = context.resCtx
                let base = {'x-powered-by': 'node'}
                let finalHeader = Object.assign(base,header)
                response.writeHead(statusCode, statusMessage, finalHeader)
                response.end(body)
            })
        }
    }
}

module.exports = App
