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
  PageContent,
  FlexBox
} = common;

const links = {
  tutorials: 'https://intercom.help/leadcart/en/collections/2005494-getting-started-guide',
  helpCenter: 'https://intercom.help/leadcart'
};

const HelpItem = ({ title, description, footer, image }) => (
  <Card
    className='help-item m-2'
    title={(
      <a
        href='/'
        onClick={(e) => e.preventDefault()}
      >
        {title}
      </a>
    )} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    <div id='help-item-image' className='mb-1'><img src={image} alt='informative text' /></div>
    <div className='help-item-title mb-1'>{title}</div>
    <div className='help-item-desc mb-3'>{description}</div>
    {footer}
  </Card>
);

export default () => {
  const openIntercom = ({ target: { dataset } }) => {
    const { message } = dataset;
    if (window.Intercom)
      window.Intercom('showNewMessage', message);
  };

  return (
    <Page>
      <PageHeader>
        <MainTitle className='bold-text large-text'>Help center</MainTitle>
      </PageHeader>
      <PageContent className='flex-box'>
        <FlexBox wrappable flex center='v-center'>
          <HelpItem
            title='Tutorials & Use Cases'
            footer={(
              <a href={links.tutorials} target='_blank' rel='noopener noreferrer'>
                <Button
                  type='primary'
                  name='tutorials'
                >
                  Tutorials & Use Cases
                </Button>
              </a>
            )}
            image={TutorialsSVG}
          />
          <HelpItem
            title='Help Center'
            image={HelpSVG}
            footer={(
              <div className='d-flex'>
                <a href={links.helpCenter} target='_blank' rel='noopener noreferrer'>
                  <Button
                    type='primary'
                    className='mr-1'
                    name='helpCenter'
                  >
                    Help Center
                  </Button>
                </a>
                <Button
                  type='primary'
                  onClick={openIntercom}
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
              <Button
                data-message='I have Found a bug, '
                type='primary'
                onClick={openIntercom}
              >
                Report Bugs & Feedback
              </Button>
            )}
          />
        </FlexBox>
      </PageContent>
    </Page>
  );
};
