import React, {Component} from 'react'
require('./index.scss')

export default
class Pagination extends Component{
    handlePage(num){
        this.props.onChangePage(num)
    }
    render(){
        let { total,currentPage } = this.props
        return (
            <section className="pagination clearfix">
                {
                    currentPage>0 && <div className="prev" onClick={this.handlePage.bind(this,-1)}>
                        <i className="iconfont icon-right"></i>
                        <span className="prev-text">上一页</span>
                    </div>
                }
                {
                    currentPage<total-1 && <div className="next" onClick={this.handlePage.bind(this,1)}>
                        <span className="next-text">下一页</span>
                        <i className="iconfont icon-right"></i>
                    </div>
                }

            </section>
        )
    }
}


