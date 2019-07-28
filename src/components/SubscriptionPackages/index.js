import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
const {
  InputRow,
  HeadeLine,
  BigText,
  FlexBoxesContainer,
  MainBlock,
  MainTitle,
  PackageCard,
  Box,
  SmallButton,
  SpcialAnnouncement
} = common;


const index = (props) => (
        <Box
        header={(
          <Fragment>
            <HeadeLine className='subscription-head-line'>
              Subscription
          </HeadeLine>
            <div className='subscription-head-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nam, perferendis fugiat nobis deserunt exercitationem officia error fugit omnis asperiores voluptates vero, illo eos ipsam? Adipisci unde quos voluptatem qui.</div>
          </Fragment>
        )}
        content={(
          <FlexBoxesContainer className='packages-container'>
            <PackageCard
              name='Pro'
              prices={prices.pro}
              onSelect={() => { }}
            />
            <PackageCard
              name='Premium'
              prices={prices.premium}
              onSelect={() => { }}
              active
            />
          </FlexBoxesContainer>
        )}
        footer={(
          <Fragment>
            <div className='error-message redeem-box-error'>
              {errors.message}
            </div>
            <InputRow.Label
              notes='Redeem codes and to get more sub accounts access'
            >
              You Have Redeemed
            {' '}
              {codesUsed || 0}
              {' '}
              out of
            {' '}
              {codesUsed > 5 ? codesUsed : 5}
              {' '}
              codes
          </InputRow.Label>
          </Fragment>
        )}
      />
    );

index.propTypes = {

};

export default index;
