import React, { Component } from 'react';

import './style.css';
import { EasyAnimate } from '../Animation';


export default class Tabel extends Component {
  static Head = ({ children, ...props }) => (
    <span className='table-head'>
      {children}
    </span>
  )

  static Body = ({ children, ...props }) => (
    <div className='tabel-body'>{children}</div>
  )

  static HeadCell = ({ children, ...props }) => (
    <div className='table-head-cell'>
      {children && (
        <span>
          {children}
        </span>
      )}
    </div>
  )

  static Row = ({ children, orderInList = 0, ...props }) => (
    <EasyAnimate className='table-row' delay={orderInList * 100}>{children}</EasyAnimate>
  )

  static Cell = ({
    children, mainContent, subContent, ...props
  }) => (
    <div className='table-cell'>
      {mainContent && <span className='cell-main-content'>{mainContent}</span>}
      {typeof subContent !== 'object'
        ? <span className='cell-sub-content'>{subContent}</span>
        : <span className={`cell-sub-content ${subContent && subContent.className}`}>{subContent && subContent.content}</span>
      }
      {children}
    </div>
  )

  static SmallCell = ({ children, ...props }) => (
    <div className='small-table-cell'>{children}</div>
  )

  static RowControlls = ({ children, ...props }) => (
    <div className='row-controls'>
      {children}
    </div>
  )


  render = () => (
    <div className='tabel-container'>
      {this.props.children}
    </div>
  )
}
