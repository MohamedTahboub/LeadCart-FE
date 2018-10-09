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

