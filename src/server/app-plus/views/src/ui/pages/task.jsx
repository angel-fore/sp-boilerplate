import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import style from './task.less'

@connect()
@ImportStyle(style)
export default class PageTask extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <h2>{translate('task.title')}</h2>
            </div>
        )
    }
}