import axios from 'axios'

const blogDetailApi = query=>{
    let api = '/blogDetail.action'
    return axios.get(api,{params: query}).then(res=>{
        return res['data']
    })
}
const blogListApi = (query={})=>{
    let api = '/blogList.action'
    return axios.get(api,{params: query}).then(res=>{
        return res['data']
    })
}
const submitBlogApi = (data)=>{
    let api = '/blog.action'
    return axios.post(api,data)
        .then((res)=>{
            if(res['status']==-1){
                return {
                    error:true,
                    msg:res['data']
                }
            }else{
                return res['data']
            }
        })
}
const deleteBlogApi = id=>{
    let api = '/deleteBlog.action'
    return axios.post(api,{id}).then(res=>{
        if(res['status'] === -1){
            return {
                error: true,
                message: res['data']
            }
        }else{
            return res['data']
        }
    })
}
const blogArchiveApi = ()=>{
    let api = '/archives.action'
    return axios.get(api).then(res=>{
        return res['data']
    })
}
export {
    blogDetailApi,
    blogListApi,
    submitBlogApi,
    deleteBlogApi,
    blogArchiveApi
}
