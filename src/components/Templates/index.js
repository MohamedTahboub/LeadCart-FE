import React from 'react'

import './style.css'
export default ({active , ...props}) => (
    <div className='template-preview-container'>
        <div className='preview-image'>
            <i class="fas fa-eye"></i>
            <div>Preview</div>
        </div>
        <div className='template-preview-footer'>
            <span className='template-preview-name'>Classic</span>
            <span className={!active ? 'btn preview-select-btn ' : 'preview-select-btn active-template-preview'}>{!active ? 'Select' : 'active'}</span>
        </div>
    </div>
)