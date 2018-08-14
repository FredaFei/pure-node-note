const Router = require('./router')
const router = new Router()
const {
    $_saveBlog,
    $_saveCategory,
    $_getCategoryList,
    $_getBlogList,
    $_getBlogDetail,
    $_deleteBlog,
    $_getBlogArchive
} = require('./mongo')

// 添加博客
router.post('/blog.action',ctx=>{
    let blog = ctx.reqCtx.body
    return $_saveBlog(blog)
})
// 删除博客
router.post('/deleteBlog.action',ctx=>{
    let { body } = ctx.reqCtx
    return $_deleteBlog(body)
})
// 获取博客详情
router.get('/blogDetail.action',ctx=>{
    let { query } = ctx.reqCtx
    return $_getBlogDetail(query)
})
// 获取博客列表
router.get('/blogList.action',ctx=>{
    let { query } = ctx.reqCtx
    if(!query.page){
        query.page = 0
    }
    return $_getBlogList(query)
})

// 获取分类列表
router.get('/categoryList.action',ctx=>{
    return $_getCategoryList()
})
// 添加分类
router.post('/addCategory.action',ctx=>{
    let { body } = ctx.reqCtx
    return $_saveCategory(body)
})

// 获取归档列表
router.get('/archives.action',ctx=>{
    return $_getBlogArchive()
})

module.exports = router
