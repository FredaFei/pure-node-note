/**
 * 创建schema
*/
const {Schema} = require('mongoose')

// 创建博客分类
const categorySchema = new Schema({
    name: String,
    id: String
})

// 创建博客
const blogSchema = new Schema({
  title: String,
  content: String, // html
  rowContent: String, // markdown
  category: categorySchema,
  date: String,
  readCount: Number
},{
    _id: false,
    strict: false
})


module.exports = {
    blogSchema,
    categorySchema
}
