class Chain{
    constructor(){
        this.middlewareArr = []
        this.middlewareChain = Promise.resolve()
    }
    use(middle){
        this.middlewareArr.push(middle)
    }
    composeMiddel(context){
        for(let middle of this.middlewareArr){
            this.middlewareChain = this.middlewareChain.then(()=>{
                return middle(context)
            })
        }
        return this.middlewareChain
    }
    init(options){
        this.composeMiddel(options).then((val)=>{
            console.log(val)
            console.log('end----')
        })
    }
}

const stepOne = (val)=>{
    return Promise.resolve({
        then: (resolve,reject)=>{
            setTimeout(()=>{
                resolve(val)
            },1000)
        }
    })
}
const stepTwo = (val)=>{
    return Promise.resolve({
        then: (resolve,reject)=>{
            setTimeout(()=>{
                resolve(val)
            },3000)
        }
    })
}


var chain = new Chain()
chain.use(stepOne)
chain.use(stepTwo)
chain.init('text')