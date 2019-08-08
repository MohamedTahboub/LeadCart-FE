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
    trial: isTrail,
    trialEndDate
  } = {},
  userSource,
  lastTransaction
}) => (
  <Box
    className='active-package-box'
    header={<HeadLine>Active Package :</HeadLine>}
    content={(
      <BigText>
        <div className='package-level'>
          {packageType}
          {isTrail && (
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
        <div className='note-text'>{`subscribed to a ${period.toLowerCase()} plan`}</div>
      </BigText>
    )}
    footer={(
      <FlexBoxesContainer>
        <div>
          <InputRow.Label>Nex billing date</InputRow.Label>
          {userSource === 'saasmntra'
            ? <div> ~ Eternity</div>
            : <div>{moment(lastTransaction.updateAt).add(1, 'M').format('MMM DD, YYYY')}</div>
          }
        </div>

      </FlexBoxesContainer>
    )}
  />
);

ActivePackage.propTypes = {
  type: PropTypes.string.isRequired,
  trail: PropTypes.objectOf({}).isRequired
};


export default ActivePackage;
