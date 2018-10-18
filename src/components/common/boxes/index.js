import React from 'react'
import { ActivationSwitchInput } from "../Buttons";
import './style.css'
export const FlexBoxesContainer = ({ children, classes = [], ...props }) => (
    <div className={'flex-boxes-container ' + classes.join(' ')}>
        {children}
    </div>
)

export const MainBlock = ({ title, notes, children, containerClasses, blockHandel, blockActivabilityHandle = false, ...props }) => (
    <div className='main-block'>
        <div className='main-title-container'>
            <span className='main-title'>{title}</span>
            {notes && <span className='main-title-note'>{notes}</span>}
            {blockHandel && blockHandel}
        </div>
        {children &&
            <div className={'box-container ' + (containerClasses && containerClasses.join(' '))}>
                {children}
            </div>}
    </div>
)

export const SmallBox = ({ clickable = false, ...props }) => (
    <div style={(clickable && { cursor: 'pointer' })} className='small-box'>
        <div className='small-box-container'>
            {props.children}
        </div>
    </div>
)
export const Box = ({ header, content, footer, ...props }) => (
    <div className='normal-box'>
        {header && <div className="box-header">{header}</div>}
        {content && <div className="box-content">{content}</div>}
        {footer && <div className="box-footer">{footer}</div>}
    </div>
)