import React, { Component } from 'react'
import { Avatar } from '../Cards'


import './style.css'



export default class Tabel extends Component {
    static Head = ({ children, ...props }) => (
        <span className="table-head">
            {children}
        </span>
    )

    static Body = ({ children, ...props }) => (
        <div className="tabel-body">{children}</div>
    )
    static HeadCell = ({ children, ...props }) => (
        <div className="table-head-cell">
            {children && <span>
                {children}
            </span>}
        </div>
    )
    static Row = ({ children, ...props }) => (
        <div className="table-row">{children}</div>
    )
    static Cell = ({ children, mainContent, subContent, ...props }) => {
        console.log(children)
        return (
            <div className="table-cell">
                {mainContent && <span className="cell-main-content">{mainContent}</span>}
                {typeof subContent !== 'object' ?
                    <span className="cell-sub-content">{subContent}</span>
                    :
                    <span className={"cell-sub-content " + subContent.classes}>{subContent.content}</span>
                }
                {children}
            </div>
        )
    }
    static SmallCell = ({ children, ...props }) => (
        <div className="small-table-cell">{children}</div>
    )
    static RowControlls = ({ children, ...props }) => (
        <div className="row-controls">
            {children}
        </div>
    )


    render = () => (
        <div className='tabel-container' >
            {this.props.children}
        </div>
    )


}
