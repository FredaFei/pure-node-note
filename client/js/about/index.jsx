import React, {Component} from 'react'
import {render} from 'react-dom'

require('./index.scss')

class About extends Component {
    render() {
        return (
            <div className="about clearfix">
                about
            </div>
        );
    }
}

render(<About/>, document.getElementById('mod-about'))
