import React from 'react'


export const Menu = props => (
    <menu className='menu-container' >
        {props.children}
    </menu>
)
export const Link = ({ to, ...props }) => {
    const classes = props.classes ? props.classes : []
    const { history, page } = to || {}
    
    const goToPage = page =>{
        if(!history || history.location.pathname === '/'+page)
        return ;
        history && history.push(page)
    }
    return (
        <span onClick={() =>goToPage(page) } className={'menu-item ' + classes.join(' ')}>
            {props.children}
        </span>
    )
}


