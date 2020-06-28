import React from 'react';
import PropTypes from 'prop-types';
import { FaHome } from 'react-icons/fa';

import common from 'components/common';
import BaseCard from './components/secondCard';
import { data } from './data';
import './style.css';

const { SideMenu, Tabs, Tab } = common;

const SideBar = ({ canOffer }) => {
  let sideBarData = [];
  canOffer ? sideBarData = data : sideBarData = data.filter((ele) => ele.type !== 'bumpOffer');
  const builderSectionTitle =
    (<div className='builder-section__header'>
      <span className='builder-section__header-icon' ><FaHome /></span>
      Builder Section
    </div>);

  return (
    <SideMenu open>
      <Tabs active='builderSection'>
        <Tab id='builderSection' title={builderSectionTitle}>
          <section className='builder-section'>
            {
              sideBarData.map((ele) => (
                <BaseCard
                  key={ele.type}
                  type={ele.type}
                  src={ele.src}
                  title={ele.title}
                />
              ))
            }
          </section>
        </Tab>
      </Tabs>
    </SideMenu>
  );
};

SideBar.propTypes = { canOffer: PropTypes.bool };
export default SideBar;
