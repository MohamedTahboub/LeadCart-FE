import React from 'react'

export const TabsNavigator = ({ tabs, history, props }) => {
    const goToTabe = tabName => {
        history.push(`#${tabName}`)
    }
    const classes = thisTabe => ({
        className: history.location.hash === '#' + thisTabe
            ?
            'nav-link active-nav-link'
            : 'nav-link'
    })
    return (
        <div className='product-details-nav'>
            {tabs.map(({ title, hash }) => (
                <span onClick={() => goToTabe(hash)} {...classes(hash)}>{title}</span>
            ))}
        </div>
    )
}
