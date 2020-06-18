import React, { Component } from 'react';
import clx from 'classnames';
import { Tooltip } from 'antd';
import { EasyAnimate } from '../Animation';
import './style.css';

import Cell from './cell';

export default class Table extends Component {
  static Head = ({ children }) => (
    <span className='table-head'>
      {children}
    </span>
  )

  static Body = ({ children }) => (
    <div className='tabel-body'>{children}</div>
  )

  static HeadCell = ({
    children,
    flex = true,
    className = ''
  }) => (
      <div className={`table-head-cell  ${className} ${flex ? 'flex' : ''}`}>
        {children && (
          <span>
            {children}
          </span>
        )}
      </div>
    )

  static Row = ({
    children,
    orderInList = 0,
    subRow,
    className = ''
  }) => (
      <EasyAnimate className={`table-row-container ${className} ${subRow ? '' : 'row-aligned-center'}`} delay={orderInList * 50}>
        <div className='table-row'>
          {children}
        </div>
        {subRow}
      </EasyAnimate>
    )

  static Cell = ({
    children,
    mainContent,
    className = '',
    flex = true,
    flexStart,
    subContent,
    sideContent,
    cellName,
    ...props
  }) => {
    const classNames = clx({
      'table-cell': true,
      [className]: className,
      flex,
      flexStart
    });

    const productNameClasses = clx({
      'cell-main-content': true,
      'truncate': cellName
    });


    return (
      <React.Fragment>
        {cellName === undefined ? <Cell
          children={children}
          mainContent={mainContent}
          subContent={subContent}
          sideContent={sideContent}
          productNameClasses={productNameClasses}
          classNames={classNames}
        />
          :

          <Tooltip placement='top' title={mainContent}>
            <Cell
              children={children}
              mainContent={mainContent}
              subContent={subContent}
              sideContent={sideContent}
              productNameClasses={productNameClasses}
              classNames={classNames}
            /></Tooltip>}

      </React.Fragment>
    );
  }


  static SmallCell = ({ children }) => (
    <div className='small-table-cell'>{children}</div>
  )

  static RowControlls = ({ children }) => (
    <div className='row-controls'>
      {children}
    </div>
  )


  render = () => {
    const { subTable, className, children } = this.props;

    const classes = clx({
      'sub-table': subTable,
      [className]: className
    });
    return (
      <div className={`table-container ${classes}`}>
        {children}
      </div>
    );
  }
}
