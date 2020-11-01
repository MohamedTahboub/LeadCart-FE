import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome } from 'react-icons/fa';

import common from 'components/common';
import { BaseCard } from './components';
import sectionsIcons from './sectionsIcons';
import './style.css';

const { SideMenu, Tabs, Tab } = common;

const SideBar = ({ canOffer }) => {
  const [isToggled, setIsToggled] = useState(false);

  const sideBarData = canOffer ? sectionsIcons : sectionsIcons.filter((ele) => ele.type !== 'bumpOffer');
  const builderSectionTitle =
    (<div className='builder-section__header'>
      <span className='builder-section__header-icon' ><FaHome /></span>
      Builder Section
    </div>);


  const onToggle = () => {
    setIsToggled((open) => !open);
  };

  return (
    <SideMenu open={isToggled} onToggle={onToggle} toggleOnHover>
      <Tabs active='builderSection'>
        <Tab id='builderSection' title={builderSectionTitle}>
          <section className='builder-section'>
            {
              sideBarData.map((section) => (
                <BaseCard
                  key={section.type}
                  {...section}
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
