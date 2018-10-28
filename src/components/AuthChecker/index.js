import React from 'react';
import { connect } from 'react-redux'


const AuthChecker = ({ user, isLoggedIn, history, ...props }) => {
    const { location: { pathname, hash } } = history

    const unregesteredPaths = ['/login', '/signup']
    console.log(pathname)
    isLoggedIn ?
        user.status ?
            ([...unregesteredPaths, '/promocode']).includes(history.location.pathname) ?
                history.push('/') : history.push(history.location.pathname+hash)
            : history.push('/promocode')
        :
        unregesteredPaths.includes(history.location.pathname)
            ? null : history.push('/login')

    return null
}

const mapStateToProps = ({ user: { user, isLoggedIn } }) => ({ user, isLoggedIn })
export default connect(mapStateToProps)(AuthChecker);