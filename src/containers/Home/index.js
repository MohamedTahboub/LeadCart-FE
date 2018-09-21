import React from 'react'

// Components
import Header  from 'components/Header'
import Content  from 'components/Content'
import SideBar  from 'components/SideBar'
import ActiveContent  from 'components/ActiveContent'

import './style.css'
export const Home = props => (
    <div className='home-container'>
        <Header/>
        <Content>
            <SideBar history={props.history} />
            <ActiveContent />
        </Content>
    </div>
)

export default Home
