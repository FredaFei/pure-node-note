const mongoose = require('mongoose')
const { blogSchema, categorySchema } = require('./schema')
const { transObjectId } = require('./util.js')

const BlogModel = mongoose.model('Blog', blogSchema)
const CategoryModel = mongoose.model('Archives', categorySchema)

const $_saveBlog = blog => {
    //去重
    let condition = { title: blog.title }
    let { id } = blog
    if (id) {
        condition = { _id: transObjectId(id) }
    }
    blog.date = new Date().toLocaleString()
    return BlogModel.findOneAndUpdate(condition, blog, {
        upsert: true,
        new: true
    }).exec()
    .then(db_blog => {
      return { status: 1, data: db_blog }
    })
}

const $_saveCategory = category => {
    return CategoryModel.findOneAndUpdate({ name: category.name }, category, {
        upsert: true
    }).then(category => {
        return {
            status: 1,
            data: category || '新建分类成功'
        }
    });
}

const $_getCategoryList = query=>{
    return CategoryModel.find().sort({name: 1}).exec().then(categoryList=>{
        return {
            status: 1,
            data: categoryList
        }
    })
}

const $_getBlogList = async query=>{
    let start = query.page * 10
    let total = await BlogModel.find().estimatedDocumentCount();
    return BlogModel.find().skip(start).limit(10).sort({date: -1}).exec().then(blogList=>{
        return {
            status: 1,
            data: {
                data: blogList,
                total: total
            }

        }
    })
}

const $_getBlogDetail = query=>{
    let condition = query
    let { id } = query
    if(id){
        condition = { _id: transObjectId(id) }
    }
    return BlogModel.findOne(condition).exec().then(blog=>{
        return {
            status: 1,
            data: blog
        }
    })
}

const $_deleteBlog = query=>{
    let condition = query
    let { id } = query
    if(id){
        condition = { _id: transObjectId(id) }
    }
    return BlogModel.remove(condition).exec().then(blog=>{
        return {
            status: 1,
            data: '删除成功'
        }
    })
}
const $_getBlogArchive = ()=>{
    let condition = new Date().toLocaleString()
    //  小于当前时间的博客记录
    return BlogModel.find({"date":{"$lt":"condition"}}).exec().then(blog=>{
        return {
            status: 1,
            data: blog
        }
    })
}

module.exports = {
  $_saveBlog,
  $_saveCategory,
  $_getCategoryList,
  $_getBlogList,
  $_getBlogDetail,
  $_deleteBlog,
  $_getBlogArchive
}
