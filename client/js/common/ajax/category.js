import axios from 'axios'

const categoryListApi = category=>{
    let api = '/categoryList.action'
    return axios.get(api).then(res=>{
        return res['data']
    })
}
const categoryApi = category=>{
    let api = '/addCategory.action'
    return axios.post(api,category).then(res=>{
        return res['data']
    })
}

export {
    categoryApi,categoryListApi
}
