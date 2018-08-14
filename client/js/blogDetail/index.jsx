import React, {Component} from 'react'
import {render} from 'react-dom'
import querystring from 'querystring'
import DetailPanel from '../components/detail/index.jsx'
import withLoadHoc from '../common/withLoadHoc.js'
import { blogDetailApi } from 'common/ajax/'


require('./index.scss')

const query = querystring.parse(location.search.substr(1))
const Detail = (props)=>{
    return <DetailPanel detail={props.data} />
}

const BlogDetail = withLoadHoc(Detail, blogDetailApi(query))
render(<BlogDetail/>, document.getElementById('mod-blogDetail'))
