import React, { Component } from 'react'

import './style.css'

export const MainBlock = props => (
    <div className='main-block'>
        <span className='main-title'>{props.title}</span>
        <div className='box-container'>
            {props.children}
        </div>
    </div>
)
