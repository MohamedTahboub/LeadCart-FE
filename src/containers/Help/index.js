import React, { useState } from 'react';
import common from 'components/common';
import { Button, Card } from 'antd';
import classNames from 'classnames';
import { EasyAnimate, SlidingAnimation } from 'components/common/Animation';

import './style.css';


const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  InputRow,
  InsightBadge
} = common;

const HelpItem = ({ title, description }) => (
  <Card className='help-item m-2' title={<a>{title}</a>} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div id='help-item-image' className='mb-1' />
    <div className='help-item-title mb-1'>{title}</div>
    <div className='help-item-desc mb-1'>{description}</div>
  </Card>
);

export default () => {
  const [isMoreClicked, clickMore] = useState(false);
  return (
    <Page>
      <PageHeader>
        <MainTitle>Help center</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='d-flex d-col align-center'>
          <div className='d-flex justify-space-between mb-4'>
            <HelpItem
              title='Tutorials'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />
            <HelpItem
              title='Help Center'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />
            <HelpItem
              title='Bugs & Feedback'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />
          </div>
          <div className='d-flex d-col align-center'>
            {
              isMoreClicked ? (
                <SlidingAnimation>
                  <HelpItem
                    title='Chat Support'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                  />
                </SlidingAnimation>
              ) : (
                <Button onClick={clickMore}>More</Button>
              )
            }
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
