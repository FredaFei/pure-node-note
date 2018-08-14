//withLoadHoc.js
import React, { Component } from 'react'
import Loading from 'components/loading/index.jsx'

export default (WrappedComponent, getData)=>{
    return class extends Component{
        constructor(){
            super(...arguments)
            this.state = {
                data: null
            }
        }
        componentDidMount(){
            //do somethings
            const ref = WrappedComponent.prototype
            console.log(ref)
            getData.then(data=>{ this.setState({data}) })
        }
        render(){
            let { data } = this.state
            return(
                <div>
                    {
                        do{
                            if(data){
                                <WrappedComponent data={data} {...this.props} />
                            }else{
                                <Loading />
                            }
                        }
                    }
                </div>
            )
        }
    }
}
