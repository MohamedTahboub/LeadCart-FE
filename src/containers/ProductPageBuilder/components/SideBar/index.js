import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome } from 'react-icons/fa';
import { BsLayoutWtf } from 'react-icons/bs';

import common from 'components/common';
import { BaseCard } from './components';
import sectionsIcons from './sectionsIcons';
import './style.css';
import { TemplatesList } from '../PageSetupModal/components';

const { SideMenu, Tabs, Tab, FlexBox } = common;

const SideBarTitle = ({ title, icon }) => {
  return (
    <div className='builder-section__header'>
      <span className='builder-section__header-icon' >{icon}</span>
      <span className='builder-side-bar-title'>{title}</span>
    </div>
  );
};

const SideBar = ({ canOffer }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();

  const sideBarData = canOffer ? sectionsIcons : sectionsIcons.filter((ele) => ele.type !== 'bumpOffer');


  const onToggle = () => {
    setIsToggled((open) => !open);
  };

  const onTemplateSelect = (templateId) => () => {
    setSelectedTemplate(templateId);
  };

  return (
    <SideMenu open={isToggled} onToggle={onToggle} toggleOnHover>
      <Tabs active='builderSection'>
        <Tab id='builderSection' title={<SideBarTitle title='Builder Section' icon={<FaHome />} />}>
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
        <Tab id='templates' title={<SideBarTitle title='Templates' icon={<BsLayoutWtf />} />}>
          <FlexBox column className='side-bar-templates-list'>
            <TemplatesList
              onSelect={onTemplateSelect}
              cardClassName='template-card-for-side-bar'
              selected={selectedTemplate}
            />
          </FlexBox>
        </Tab>
      </Tabs>
    </SideMenu>
  );
};

SideBar.propTypes = { canOffer: PropTypes.bool };
export default SideBar;
