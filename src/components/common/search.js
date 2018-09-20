import React from 'react'


export const SearchBar = props => (
    <div className='search-bar'>
        <span className='search-lable'>Search products</span>
        <div className='search-field'>
            <i class="fas fa-search search-icon"></i>
            <input className='search-input-filed' type='text' placeholder='Search' />
        </div>
    </div>
)
