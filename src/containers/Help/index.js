import React from 'react';
import common from 'components/common';
import { Button, Card } from 'antd';
import TutorialsSVG from 'assets/images/Problem-solving-rafiki.svg';
import HelpSVG from 'assets/images/Problem-solving-pana.svg';
import BugsAndFeedbackSVG from 'assets/images/Work-chat-rafiki.svg';

import './style.css';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

const HelpItem = ({ title, description, footer, image }) => (
  <Card className='help-item m-2' title={<a>{title}</a>} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div id='help-item-image' className='mb-1'><img src={image} alt='informative text'/></div>
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
              footer={(
                <Button type='primary'>
                  Tutorials & Use Cases
                </Button>
              )}
              image={TutorialsSVG}
            />
            <HelpItem
              title='Help Center'
              image={HelpSVG}
              footer={(
                <div className='d-flex'>
                  <Button type='primary' className='mr-1' onClick={() => window.open('https://help.leadcart.io', '_blank')}>
                    Help Center
                  </Button>
                  <Button type='primary' onClick={() => {
                    const { Intercom } = window;
                    if (!Intercom) return;
                    Intercom('showNewMessage');
                  }}
                  >
                    Chat Support
                  </Button>
                </div>
              )}
            />
            <HelpItem
              title='Bugs & Feedback'
              image={BugsAndFeedbackSVG}
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
