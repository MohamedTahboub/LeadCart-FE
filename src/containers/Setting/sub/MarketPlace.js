import React from 'react';
import common from 'components/common';
import zapierBrand from 'assets/images/zapier_brand.png';

import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';

import './styles.css';
const {
    Button, MainBlock, MainTitle, SmallBox, FlexBoxesContainer, MediumCard, ActivationSwitchInput
} = common;

const AddNewButton = (props) => (
    <Button classes='primary-color medium-add-btn'>
        <i className='fas fa-plus' />
        {' '}
        Add new
  </Button>
);
// ColorInlinePicker

export default (props) => (
    <React.Fragment>
        <MainTitle>Payment </MainTitle>
        <MediumCard imgSrc={stripeImage} />
        <MediumCard imgSrc={paypalImage} />
        <MainTitle>
            Zapier
    </MainTitle>
        <FlexBoxesContainer>
            <SmallBox classes={['zapier-spcial-box']} clic>
                <img className='zapier-brand-image' src={zapierBrand} alt='zapier brand' />
                <input type="text" className="zapier-client-oauth" placeholder='Enter Zapier client Id'/>
            </SmallBox>
            {/*<SmallBox clickable>
                <span className='box-text-small'>
                    <i className='fas fa-plus' />
                    {' '}
                    Add new
        </span>
            </SmallBox>*/}
        </FlexBoxesContainer>
    </React.Fragment >
);
