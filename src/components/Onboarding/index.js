import React from 'react';
import { Button } from 'antd';
import './style.css';

const Onboarding = (props) => (
  <div className='onboarding-wrapper'>
    <h2 className='onboarding-header mb-4'>Explore our services!</h2>
    <div className='onboarding-feature'>
      <div id='videoplayer' className='feature-video mb-3'/>
      <div className='feature-title'>
        <h3>Video title</h3>
      </div>
      <div className='feature-description mb-3 mx-5'>
        <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </div>
      <div className='feature-action'>
        <Button type='primary' shape='round'>Learn more</Button>
      </div>
    </div>
  </div>
);

export default Onboarding;
