import React from 'react';

import  { Menu , Link } from 'components/common/MainMenu'
import AvatarPreviewBox from 'components/common/AvatarPreviewBox'
import './style.css'


const goToPage = ({ history , page }) =>{
    if(!history || history.location.pathname === '/'+page)
    return ;
    history && history.push(page)
}

export default ({history , props}) => (
    <div class='side-bar' >
        <AvatarPreviewBox />
        <span onClick={()=>goToPage({history , page :'/product/new#details'})} className='btn new-product-btn'>
            <i class="fas fa-plus"></i> New Product
        </span>
        <Menu >
            <Link to={{history , page :'/products'}} classes={['active-menu-item']}>Products</Link>
            <Link to={{history , page :'/activities'}} >Activity</Link>
            <Link to={{history , page :'/coupon'}} >Coupon</Link>
            <Link  to={{history , page :'/upsells'}} classes={['locked-feature']}>Upsells</Link>
            <Link  to={{history , page :'/reports'}} classes={['locked-feature']}>Reports</Link>
            <Link  to={{history , page :'/affiliates'}} classes={['locked-feature']}>Affiliates</Link>
            <Link to={{history , page :'/agency'}} >Agency</Link>
            <Link to={{history , page :'/help'}} >Help</Link>
        </Menu>
    </div>
);