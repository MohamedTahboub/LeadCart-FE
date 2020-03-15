import React, { Component } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';

import {
  PasswordBox,
  AccountDetails,
  Brands
} from './components';
const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  FlexBox
} = common;

const Account = ({
  onChangeAccountPassword,
  onChangeAccountDetails,
  brands
}) => (
  <Page>
    <PageHeader>
      <MainTitle>Account</MainTitle>
    </PageHeader>
    <PageContent>
      <FlexBox column>
        <FlexBox wrappable flexStart spaceBetween>
          <AccountDetails onUpdate={onChangeAccountDetails} />
          <PasswordBox onUpdate={onChangeAccountPassword} />
        </FlexBox>
        <Brands list={brands} />
      </FlexBox>
    </PageContent>
  </Page>
);

Account.defaultProps = {
  brands: []
};

const mapStateToProps = ({ account, brands, user: { user } }) => ({
  user,
  passwordsModel: account.passwordsModel || {},
  detailsModel: account.detailsModel || {},
  brands
});
export default connect(mapStateToProps, accountActions)(Account);
