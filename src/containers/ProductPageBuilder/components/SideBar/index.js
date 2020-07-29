import React from 'react';
import PropTypes from 'prop-types';
import { FaElementor, FaHome } from 'react-icons/fa';

import common from 'components/common';
import { BaseCard, sectionsIcons } from './BuilderSections';
import Templates from './TemplatesSection';
import './style.css';

const { SideMenu, Tabs, Tab } = common;

const SideBar = ({ canOffer }) => {
  const sideBarData = canOffer ? sectionsIcons : sectionsIcons.filter((ele) => ele.type !== 'bumpOffer');

  const builderSectionTitle =
    (<div className='tab-section__header'>
      <span className='tab-section__header-icon' ><FaHome /></span>
      Builder Section
    </div>);

  const templatesSectionTitle =
    (<div className='tab-section__header'>
      <span className='tab-section__header-icon' ><FaElementor /></span>
      Templates
    </div>);


  return (
    <SideMenu open>
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

        <Tab id='templates' title={templatesSectionTitle}>
          <Templates />
        </Tab>
      </Tabs>
    </SideMenu>
  );
};

SideBar.propTypes = { canOffer: PropTypes.bool };
export default SideBar;
