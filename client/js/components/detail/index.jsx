import React,{Component} from 'react'
import { Modal, Button } from 'antd'

require('./index.scss')

export default
class DetailPanel extends Component{
    renderBlog(){
        let { detail } = this.props
        if(detail['content']){
            return <div className="art-figure" dangerouslySetInnerHTML={{__html: detail['content']}}></div>
        }else{
            return <div className="art-figure">没有内容</div>
        }
    }
    render(){
        let { title,date,_id,category } = this.props.detail
        return(
            <article className="markdown">
                <div className="art-header">
                    <h1 className="art-title">
                        <a href={`/blogDetail?id=${_id}`}>{title}</a>
                    </h1>
                    <div className="art-meta">
                        <span className="time">发表于{date}</span>
                        <span className="category">{category&&category.name}</span>
                        {window.hasUser && <span><a className="edit" href={`/manage?type=edit&blogId=${_id}`}>编辑</a></span>}
                    </div>
                </div>
                <div className="art-content">
                    { this.renderBlog() }
                </div>
            </article>
        );
    }
}
