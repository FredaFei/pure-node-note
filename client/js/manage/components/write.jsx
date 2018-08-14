import React ,{ Component } from 'react'
import { render } from 'react-dom'
import { categoryListApi,blogDetailApi  } from 'common/ajax/'
import  BlogWritePanel from 'components/write/index.jsx'

export default
class Write extends Component{
    constructor(){
        super();
        this.state={
            content:"",
            title:'',
            previewContent:"",
            categoryList: [],
            category:{}
        }
    }
    componentDidMount(){
        let {blogId} = this.props
        if(blogId){
            blogDetailApi({id:blogId}).then(detail=>{
                if(detail){
                    this.setState({
                        content: detail.rawContent,
                        category: detail.category,
                        title: detail.title,
                        previewContent: detail.content,
                        blogId: detail._id
                    })
                }
            })
        }
        categoryListApi().then(categoryList=>{
            this.setState({categoryList})
        })
    }
    render(){
        return <BlogWritePanel {...this.state}/>
    }
}
