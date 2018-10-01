import React from 'react'

export default props => {

    return (
        <div className='insight-box section-box'>
            <div className='insight-details'>
                <span className='insight-title'>{props.title}</span>
                <span className='insight-value'>{props.value}</span>
            </div>
            <span className='insight-icon'>
                {props.icon}
            </span>
        </div>
    )
}