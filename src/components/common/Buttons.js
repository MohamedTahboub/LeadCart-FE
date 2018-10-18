import React from 'react'



export const Button = ({ classes, children, ...props }) => (
    <span className={"btn  " + (classes || '')}>
        {children}
    </span>
)
export const MiniButton = ({ iconClass, children, classes, ...props }) => (
    <span className={"mini-btn  " + (classes || '')}>
        {iconClass && <i class={"fas " + iconClass} />}
        {children}
    </span>
)
export const SmallButton = ({ iconClass, children, classes, ...props }) => (
    <span className={"small-btn  " + (classes || '')}>
        {iconClass && <i class={"fas " + iconClass} />}
        {children}
    </span>
)

export const DeleteButton = ({ iconType, ...props }) => (
    <span className='btn delete-btn x-small-btn'>
        <i class={`fas fa-${iconType}-alt `}></i>
    </span>
)

export const ActivationSwitchInput = props => (
    <label class="switch-slider-input activability-switch">
        <input type="checkbox" />
        <span class="slider-input slider-round"></span>
    </label>
)

export const EditButton = ({ classes = [], children, ...props }) => (
    <span className={'edit-btn '+classes.join(' ')}>
        <i class="fas fa-edit"></i>{children}
    </span>
)