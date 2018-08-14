import React, {Component} from 'react'
import { Row,Col,Card,Input,Button,Table } from 'antd'
import { categoryApi, categoryListApi } from 'common/ajax'

export default
class Category extends Component {
  state = {
    categoryList: [],
    newCategory: {}
  }
  submit(){
      let {categoryList,newCategory} = this.state
      categoryApi(newCategory).then(val=>{
          this.setState({categoryList: categoryList.concat([newCategory])})
          this.setState({newCategory: ''})
      })
  }
  componentDidMount(){
      categoryListApi().then(categoryList=>{
          this.setState({ categoryList })
      })
  }
  genColumn(){
      return [{
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
          render: name=> <span key={name}>{name}</span>
      },{
          title: '分类ID',
          dataIndex: 'id',
          key: 'id',
          render: id=> <span key={id}>{id}</span>
      }]
  }
  render() {
    let {categoryList,newCategory} = this.state
    return (
        <div className="manage-content">
            <Row>
                <Col span={12}>
                    <Card title="已有分类"
                          extra={<a href="#">More</a>}
                          style={{width: '90%'}}>
                          {
                              do{
                                  if(categoryList && categoryList.length>0){
                                      <Table columns={this.genColumn()}
                                          rowKey={record=>record.id}
                                          dataSource={categoryList} />
                                  }else{
                                      null
                                  }
                              }
                          }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="添加分类"
                          extra={<a href="#">More</a>}
                          style={{width: '86%'}}>
                            <Input type='text' value={newCategory.name || ''}
                                 onChange={e=>this.setState({
                                     newCategory: {
                                         name: e.target.value,
                                         id: e.target.value
                                     }
                                 })} />
                            <Button style={{marginTop: '14px'}} onClick={::this.submit}>提交分类</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}
