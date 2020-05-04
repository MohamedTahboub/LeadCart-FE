import React from 'react';
import common from 'components/common';
import { Button, Card } from 'antd';

import './style.css';


const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

const HelpItem = ({ title, description, footer }) => (
  <Card className='help-item m-2' title={<a>{title}</a>} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div id='help-item-image' className='mb-1' />
    <div className='help-item-title mb-1'>{title}</div>
    <div className='help-item-desc mb-3'>{description}</div>
    {footer}
  </Card>
);

export default () => {
  return (
    <Page>
      <PageHeader>
        <MainTitle>Help center</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='d-flex d-col align-center'>
          <div className='d-flex justify-space-between mb-4'>
            <HelpItem
              title='Tutorials & Use Cases'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              footer={(
                <Button type='primary'>
                  Tutorials & Use Cases
                </Button>
              )}
            />
            <HelpItem
              title='Help Center'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              footer={(
                <div className='d-flex'>
                  <Button type='primary' className='mr-1'>
                    Help Center
                  </Button>
                  <Button type='primary'>
                    Chat Support
                  </Button>
                </div>
              )}
            />
            <HelpItem
              title='Bugs & Feedback'
              description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              footer={(
                <Button type='primary'>
                  Report Bugs & Feedback
                </Button>
              )}
            />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
