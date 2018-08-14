const http = require('http')
const PORT = process.argv[2] || 3005
const App = require('./app')

// middleware
const cookieParse = require('./app/cookie-parse')
const staticServer = require('./app/static-server')
const urlParse = require('./app/url-parse')
const apiServer = require('./app/api')
const viewServer = require('./app/view-server')

const server = new App()
server.use(cookieParse)
server.use(urlParse)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)


// 连接数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise //使用原生的Promise
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true},err=>{
    if(err){
        console.log(`db connect success`)
    }else{
        console.log(`db connect success`)
    }
})

http.createServer(server.initServer()).listen(PORT, () => {
    console.log(`listener on ${PORT}`)
})
