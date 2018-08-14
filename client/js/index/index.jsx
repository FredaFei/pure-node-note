import React, {Component} from 'react'
import {render} from 'react-dom'
import DetailPanel from 'components/detail/index.jsx'
import Pagination from 'components/pagination/index.jsx'
import Loading from 'components/loading/index.jsx'

// import withLoadHoc from 'common/withLoadHoc.js'
import { query } from 'common/util.js'
import { blogListApi } from 'common/ajax/'

require('./index.scss')

const Article = (props)=>{
    return <div className="list">
        {
            props.data.map(item=>{
                return <DetailPanel detail={item} key={item.title} />
            })
        }
    </div>
}
console.log(query)
class Home extends Component{
    state={
        data: null,
        showprev: false,
        currentPage: +(query.page)||0,
        total: 0,
    }
    componentDidMount(){
        this.setData({page: this.state.currentPage})
    }
    handlePage(num){
        let { currentPage } = this.state
        currentPage += num
        this.setState({currentPage})
        this.setData({page: currentPage})
        window.history.pushState(null, '博客列表', `/?page=${currentPage}`)
    }
    setData(params){
        blogListApi(params).then(res=>{
            let { data,total} = res
            this.setState({data,total})
        })
    }
    renderHome(){
        let { data,currentPage,total } = this.state
        if(data){
            return <div className="home-content">
                <Article data={data} />
                <Pagination onChangePage={::this.handlePage}
                currentPage={currentPage}
                total={Math.ceil(total/10)} />
            </div>
        }else{
           return <Loading />
        }
    }
    render(){
        return <div>{this.renderHome()}</div>
    }
}


// const HomeWrapper = withLoadHoc(Home, blogListApi(query))

render(<Home />, document.getElementById('mod-index'))
