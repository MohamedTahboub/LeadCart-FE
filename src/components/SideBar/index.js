import React from 'react';


import avatarLink from 'assets/images/avatar.jpeg'
import './style.css'


const AvatarPreview = props => (
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



export default props => (
    <div class='side-bar' >
        <AvatarPreview />
        <span className='btn new-product-btn'>
            <i class="fas fa-plus"></i> New Product
        </span>


        <menu className='menu-container' >
            <span className='menu-item active-menu-item'>Products</span>
            <span className='menu-item'>Activity</span>
            <span className='menu-item'>Coupon</span>
            <span className='menu-item locked-feature'>Upsells</span>
            <span className='menu-item locked-feature'>Reports</span>
            <span className='menu-item locked-feature'>Affiliates</span>
            <span className='menu-item'>Agency</span>
            <span className='menu-item'>Help</span>
        </menu>
    </div>
);