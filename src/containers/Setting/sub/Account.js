import React from 'react';
import common from 'components/common'

const { InputRow, MainBlock, Button, FlexBoxesContainer, MainTitle } = common


const SmallFormContainer = ({ children, title, onSubmit, props }) => (
    <div className='small-form-container'>
        {title && <MainTitle>{title}</MainTitle>}
        <div className='small-form-content'>
            {children}
        </div>
        <div className='small-form-controlls'>
            <Button classes=' primary-color'>
                Update
            </Button>
        </div>
    </div>
)

export default props => (
    <React.Fragment>
        <MainBlock title='System Emails'
            blockHandel={<Button classes='save-changes-btn'>
                Save Changes</Button>
            }>
            <InputRow >
                <InputRow.Label>New Order</InputRow.Label>
                <InputRow.Note
                    content='This email is sent every time a customer buys a product.'
                >
                    <InputRow.SwitchInput />
                </InputRow.Note>
            </InputRow>
            <InputRow >
                <InputRow.Label> Failed Charge</InputRow.Label>
                <InputRow.Note
                    content="This email is sent each time a customer's subscription payment fails to charge."
                >
                    <InputRow.SwitchInput />
                </InputRow.Note>
            </InputRow>
            <InputRow >
                <InputRow.Label>New Affiliate</InputRow.Label>
                <InputRow.Note
                    content='This email is sent each time a new affiliate applies. If auto-approval is enabled, this will not be sent.'
                >
                    <InputRow.SwitchInput />
                </InputRow.Note>
            </InputRow>
        </MainBlock>
        <FlexBoxesContainer>
            <SmallFormContainer title='profile' >

                <InputRow>
                    <InputRow.Label>First Name</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Last Name</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Email</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
            </SmallFormContainer>
            <SmallFormContainer title='Password'>
                <InputRow>
                    <InputRow.Label>Current Password</InputRow.Label>
                    <InputRow.SmallInput type='password'></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>New Password</InputRow.Label>
                    <InputRow.SmallInput type='password'></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Confirm Password</InputRow.Label>
                    <InputRow.SmallInput type='password'></InputRow.SmallInput>
                </InputRow>
            </SmallFormContainer>
        </FlexBoxesContainer>
    </React.Fragment>
);
