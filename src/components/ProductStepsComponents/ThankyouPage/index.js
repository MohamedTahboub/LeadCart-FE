import React, { Component } from 'react';
import {
  Tab, Tabs, TabList, TabPanel
} from 'react-tabs';
import common from 'components/common';
import 'react-tabs/style/react-tabs.css';


const { Block, TabTitle, InputRow } = common;
class ThankYouPage extends Component {
  state = { isEnabled: false }

  toggleBumbeOfferStatus = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  }

  render () {
    return (

      <Tabs>
        <TabList>
          <Tab><TabTitle error>Thank you Page </TabTitle></Tab>
        </TabList>
        <TabPanel>
          <Block>
            <InputRow>
              <InputRow.Label>Use default Thank you Page</InputRow.Label>
              <InputRow.SwitchInput value={this.state.isEnabled} onToggle={this.toggleBumbeOfferStatus}></InputRow.SwitchInput>
            </InputRow>
            {this.state.isEnabled && (
              <InputRow>
                <InputRow.Label>Your Own Thank you Page Link</InputRow.Label>
                <InputRow.UrlInput prefix='http://'></InputRow.UrlInput>
              </InputRow>
            )}
          </Block>
        </TabPanel>
      </Tabs>
    );
  }
}

export default ThankYouPage;

