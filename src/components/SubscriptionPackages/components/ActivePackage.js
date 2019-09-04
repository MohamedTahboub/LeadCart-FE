import React, { Fragment } from 'react';
import common from 'components/common';
import PropTypes from 'prop-types';
import moment from 'moment';

const {
  InputRow,
  HeadLine,
  BigText,
  FlexBoxesContainer,
  Box,
  SmallButton,
} = common;


const ActivePackage = ({
  type: packageType,
  period,
  trial: {
    trial: isTrial,
    trialEndDate
  } = {},
  userSource,
  lastTransaction = {}
}) => (
  <Box
    className='active-package-box'
    header={<HeadLine>Active Package :</HeadLine>}
    content={(
      <BigText>
        <div className='package-level'>
          {packageType}
          {isTrial && (
            <Fragment>
              <span className='trial-package'>(trial)</span>
              <span className='trial-package-expiration'>
                  Ends :
                {' '}
                {moment(trialEndDate).fromNow()}
              </span>
            </Fragment>
          )}
        </div>
        <div className='note-text '>{`Subscribed to a ${period} Plan`}</div>
      </BigText>
    )}
    footer={lastTransaction.createdAt ? (
      <FlexBoxesContainer>
        <div>
          <InputRow.Label>Nex billing date</InputRow.Label>
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
  trail: PropTypes.objectOf({}).isRequired,
  lastTransaction: PropTypes.objectOf({})
};
ActivePackage.defaultProps = {
  lastTransaction: {}
};

export default ActivePackage;
