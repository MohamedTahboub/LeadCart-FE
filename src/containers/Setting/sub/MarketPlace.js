import React from 'react';
import common from 'components/common'
import zapierBrand from 'assets/images/zapier_brand.png'

import './styles.css'
const { Button, MainBlock, MainTitle, SmallBox, FlexBoxesContainer, ActivationSwitchInput } = common

const AddNewButton = props => (
    <Button classes='primary-color medium-add-btn'>
        <i className="fas fa-plus"></i> Add new
    </Button>
)
//ColorInlinePicker
export default props => (
    <React.Fragment>
        <MainBlock
            title='Payment'
            containerClasses={['smooth-box-padding']}
            blockHandel={<ActivationSwitchInput />}>
            <AddNewButton />
        </MainBlock>

        <MainBlock
            title='Membership'
            containerClasses={['smooth-box-padding']}
            blockHandel={<ActivationSwitchInput />}>

            <AddNewButton />
        </MainBlock>

        <MainBlock
            title='Email'
            containerClasses={['smooth-box-padding']}
            blockHandel={<ActivationSwitchInput />}
        >
            <AddNewButton />
        </MainBlock>
        <MainTitle>
            Other
        </MainTitle>
        <FlexBoxesContainer>
            <SmallBox clickable={true}>
                <img className='zapier-brand-image' src={zapierBrand} alt='zapier brand' />
            </SmallBox>
            <SmallBox clickable={true}>
                <span className='box-text-small'>
                    <i className="fas fa-plus"></i> Add new
                 </span>
            </SmallBox>
        </FlexBoxesContainer>
    </React.Fragment>
)