import React, { useState } from 'react';
import './style.css';
import { appInit } from 'actions/appInit';
import * as flashMessages from 'actions/flashMessage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshButton } from '../Buttons';


const classes = (flex, column) => `${flex ? 'display-flex' : ''} ${column ? 'flex-column' : ''}`;

export const Page = ({
  children,
  className = '',
  dflex,
  flexColumn,
  ...props
}) => (
  <div className={`page-container ${className} ${classes(dflex, flexColumn)}`}>
    {children}
  </div>
);


const Header = ({
  children,
  className = '',
  dflex,
  withRefreshBtn,
  flexColumn,
  data,
  showFlashMessage,
  appInit,
  ...props
}) => {
  const [refreshing, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    appInit(
      data,
      {
        onSuccess: () => {
          setRefresh(false);
          showFlashMessage({
            type: 'success',
            message: 'Up to Date'
          });
        },
        onFailed: () => {
          setRefresh(false);
          showFlashMessage({
            type: 'failed',
            message: 'Failed to Update'
          });
        }
      }
    );
  };

  return (
    <div className={`page-header ${className} ${classes(dflex, flexColumn)}`}>
      {children}
      {withRefreshBtn && (
        <RefreshButton
          onClick={onRefresh}
          loading={refreshing}
        />
      )}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.instanceOf(HTMLElement).isRequired,
  className: PropTypes.string,
  dflex: PropTypes.bool,
  withRefreshBtn: PropTypes.bool,
  flexColumn: PropTypes.bool,
  showFlashMessage: PropTypes.func.isRequired,
  appInit: PropTypes.func.isRequired,
};
Header.defaultProps = {
  className: '',
  dflex: false,
  withRefreshBtn: false,
  flexColumn: false,
};


export const PageHeader = connect(null, { appInit, ...flashMessages })(Header);

export const PageContent = ({
  children,
  className = '',
  dflex,
  flexColumn,
  ...props
}) => (
  <div className={`page-content-container ${className} ${classes(dflex, flexColumn)}`}>
    {children}
  </div>
);

