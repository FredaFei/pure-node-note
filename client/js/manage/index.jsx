import React, {Component} from 'react'
import {render} from 'react-dom'

import LeftMenu from './components/leftMenu.jsx'
import CategoryPanel from './components/category.jsx'
import ManagePanel from './components/manage.jsx'
import WritePanel from './components/write.jsx'
import { query } from 'common/util.js'

require('./index.scss')

class Manage extends Component {
    state = {
        activeTab: query.type || 'category'
    }
    changePanel(key){
        this.setState({activeTab: key})
    }
    render() {
        let { activeTab } = this.state
        return (
            <section className="manage-main">
                <LeftMenu onClick={::this.changePanel} activeTab={activeTab}/>
                {
                    do{
                        if(activeTab === 'category'){
                            <CategoryPanel key="category" />
                        }else if(activeTab === 'manage'){
                            <ManagePanel key="manage" />
                        }else{
                            <WritePanel key="edit" blogId={query.blogId} />
                        }
                    }
                }
            </section>
        );
    }
}

render(<Manage/>, document.getElementById('mod-manage'))
