import React,{Component} from 'react'
import { Modal, Button } from 'antd'

export default
class BlogWritePanel extends Component{
    state={
        visible: false,
        id: ''
    }
    handleState = (boolean=false,id)=>{
        this.setState({
            visible: boolean,
            id
        })
    }
    render(){
        let { id } = this.state
        return(
            <Modal title="恭喜你提交博客成功"
                visible={this.state.visible}
                onOk={()=>{this.handleState(false)}}
                onCancel={()=>{this.handleState(false)}}>
                <p><a href={`/blog?id=${id}`} target="_blank">查看提交的博客</a></p>
            </Modal>
        );
    }
}
