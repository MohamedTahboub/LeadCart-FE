import React from 'react'
import avatarLink from 'assets/images/avatar.jpeg'

export default props => (
    <div className='profile-preview'>
        <div className='avatar-holder'>
            <img class='user-avatar' src={avatarLink} alt='user avatar'/>
            <span className='setting-short'>
                <i class="fas fa-cog"></i>
            </span>
            <span className='user-name'>Jordan M.</span>
        </div>
    </div>
)
