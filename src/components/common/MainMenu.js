import React from 'react'


export default class Menu extends React.Component {
    static Link = props =>{
        const classes = props.classes ? props.classes : []
        return (
            <span className={'menu-item '+classes.join(' ') }>
            {props.children}
            </span>
        )
    } 

    render() {
        console.log(this.props)
        return (
            <menu className='menu-container' >
                    {this.props.children}
            </menu>
        )
    }
}
