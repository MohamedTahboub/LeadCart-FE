import React, { Component } from 'react';
import './style.css';

import common from 'components/common';
const {
  Page,
  PageContent,
} = common;

// <p className='zoom-area'>This web app still in the development mode ,so check later ^_*</p>

class Home extends Component {
  render () {
    return (
      <Page>
        <PageContent className='notFound-page-container'>
          <div className='four-o-four-section'>
            <h1 className='text-align-center'>Oops ,We could not find your page </h1>
            <section className='error-container'>
              <span><span>4</span></span>
              <span>0</span>
              <span><span>4</span></span>
            </section>
            <div className='link-container' />
          </div>
        </PageContent>
      </Page>
    );
  }
}

export default Home;
