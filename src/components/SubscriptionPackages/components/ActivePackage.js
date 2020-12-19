import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import clx from 'classnames';

import common from 'components/common';

const {
  InputRow,
  HeadLine,
  BigText,
  FlexBoxesContainer,
  Box
} = common;

const getExpirationDate = (date) => (moment(date).isAfter() ? moment(date).fromNow() : 'Expired');

const ActivePackage = ({
  type: packageType,
  period,
  trial: {
    trial: isTrial,
    trialEndDate
  } = {},
  userSource,
  lastTransaction = {},
  isLoading,
  isLtd
}) => (
  <Box
    className='active-package-box '
    header={<HeadLine>Active Package :</HeadLine>}
    content={(
      <BigText className={clx({ 'blur-effect': isLoading })}>
        <div className='package-level'>
          {packageType}
          {isTrial && (
            <Fragment>
              <span className='trial-package'>(trial)</span>
              <span className='trial-package-expiration'>
                Ends :
                {' '}
                {getExpirationDate(trialEndDate)}
              </span>
            </Fragment>
          )}
        </div>
        {lastTransaction.amount !== 0 && (
          <div className='note-text '>
            {!isLtd ? `Subscribed to a ${period} Plan` : 'Active Forever'}
          </div>
        )}
      </BigText>
    )}
    footer={(lastTransaction.createdAt && lastTransaction.amount !== 0 && !isLtd) ? (
      <FlexBoxesContainer className={clx({ 'blur-effect': isLoading })}>
        <div>
          <InputRow.Label>Next billing date</InputRow.Label>
          {userSource === 'saasmntra'
            ? <div> ~ Eternity</div>
            : (
              <div>
                {moment(lastTransaction.createdAt).add(1, 'M').format('MMM DD, YYYY')}
              </div>
            )
          }
        </div>

      </FlexBoxesContainer>
    ) : null}
  />
);

ActivePackage.propTypes = {
  type: PropTypes.string.isRequired,
  period: PropTypes.string,
  isLoadingClass: PropTypes.string,
  userSource: PropTypes.string,
  trial: PropTypes.objectOf(PropTypes.object).isRequired,
  lastTransaction: PropTypes.objectOf({})
};

ActivePackage.defaultProps = {
  lastTransaction: {},
  period: 'Monthly',
  isLoadingClass: '',
  userSource: ''
};

export default ActivePackage;
