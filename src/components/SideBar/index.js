import React from 'react';

import Menu from 'components/common/MainMenu'
import AvatarPreviewBox from 'components/common/AvatarPreviewBox'
import './style.css'



export default props => (
    <div class='side-bar' >
        <AvatarPreviewBox />
        <span className='btn new-product-btn'>
            <i class="fas fa-plus"></i> New Product
        </span>
        <Menu>
            <Menu.Link classes={['active-menu-item']}>Products</Menu.Link>
            <Menu.Link>Activity</Menu.Link>
            <Menu.Link>Coupon</Menu.Link>
            <Menu.Link classes={['locked-feature']}>Upsells</Menu.Link>
            <Menu.Link classes={['locked-feature']}>Reports</Menu.Link>
            <Menu.Link classes={['locked-feature']}>Affiliates</Menu.Link>
            <Menu.Link>Agency</Menu.Link>
            <Menu.Link>Help</Menu.Link>
        </Menu>
    </div>
);