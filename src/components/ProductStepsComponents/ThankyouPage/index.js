import React, { Component } from 'react';
import {
  Tab, Tabs, TabList, TabPanel
} from 'react-tabs';
import common from 'components/common';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

import 'react-tabs/style/react-tabs.css';


const { Block, TabTitle, InputRow } = common;
class ThankYouPage extends Component {
  state = { isEnabled: false }

  toggleBumbeOfferStatus = () => {
    const { isEnabled } = this.state;
    this.setState({ isEnabled: !isEnabled });
    this.props.onProductThankYouPageFieldChange({ name: 'useCustomeThankPage', value: !isEnabled });
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductThankYouPageFieldChange({ name, value });
  }

  componentDidMount () {
    const { useCustomeThankPage } = this.props;
    console.log('--------useCustomeThankPage----------',this.state.isEnabled);
    console.log('--------useCustomeThankPage----------',useCustomeThankPage);

    this.setState({
      isEnabled :  useCustomeThankPage
    });
  }

  componentDidUpdate (prevProps) {
    const { useCustomeThankPage } = this.props;
    if (prevProps.useCustomeThankPage !== useCustomeThankPage) this.setState({ isEnabled: useCustomeThankPage });
  }

  render () {
    const { isEnabled } = this.state;
    const { thankyouPage } = this.props;

    console.log('--------RENDERS----------', isEnabled);
    return (

      <Tabs>
        <TabList>
          <Tab><TabTitle error>Thank you Page </TabTitle></Tab>
        </TabList>
        <TabPanel>
          <Block>
            <InputRow>
              <InputRow.Label>Use default Thank you Page</InputRow.Label>
              <InputRow.SwitchInput key='useCustomeThankPage' preValue={isEnabled} onToggle={this.toggleBumbeOfferStatus}></InputRow.SwitchInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Your Own Thank you Page Link</InputRow.Label>
              <InputRow.UrlInput
                name='thankyouPage'
                onChange={this.onFieldChange}
                value={thankyouPage}
                disabled={!isEnabled}
                prefix='http://'
              />
            </InputRow>
          </Block>
        </TabPanel>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ product: { thankYouPage } }) => ({ ...thankYouPage });
export default connect(mapStateToProps, producActions)(ThankYouPage);
