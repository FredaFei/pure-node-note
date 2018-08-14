import React, {Component} from 'react'
import { Spin } from 'antd'

export default ()=>{
    return (
        <div className="loading-wrapper" style={{textAlign: 'center'}}>
            <Spin size='large' tip="加载中..." className='spinner'/>
        </div>
    )
}

