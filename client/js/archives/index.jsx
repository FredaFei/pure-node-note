import React, { Component } from 'react'
import { render } from 'react-dom'
import { blogArchiveApi } from 'common/ajax/'
import withLoadHoc from 'common/withLoadHoc.js'

require('./index.scss')

const PostItem = props => {
  return (
    <div className="archives-post-item">
      <span className="archives-post-time">12-12</span>
      <span className="archives-post-name">
        <a href="">hello world</a>
      </span>
    </div>
  )
}
function filt(arr, val) {
  let temp = []
  let tempObj = {posts: []}
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    let time = item['date'].substr(0, 4)
    if (time !== val) {
      tempObj['time'] = time
      tempObj['posts'] = [item]
      temp[i] = tempObj
    } else {
      temp[i] = tempObj['posts'].push(item)
    }
    console.log(tempObj)
  }
  console.log(temp)
  return temp
}

const PostList = props => {
  const list = [...props.data]
  //   const listObj = {}
  //   const listArr = []
  let listArr = list.map(item => {
    let time = item['date'].substr(0, 4)
    return filt(list, time)
    // if (!listObj['time']) {
    //   listObj['time'] = time
    //   listObj['posts'] = [item]
    // } else {
    //   listObj['posts'].push(item)
    // }
    // listArr.push(listObj)
  })
  console.log(listArr)
  return (
    <div className="archives clearfix">
      {props.data.map(item => {
        return (
          <div className="archives-year">
            <div className="archives-title">2018</div>
            <div className="archives-post-list">
              {<PostItem article={item} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Archives = withLoadHoc(PostList, blogArchiveApi())

render(<Archives />, document.getElementById('mod-archives'))
