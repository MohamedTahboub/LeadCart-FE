import React from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { connect } from 'react-redux';
import * as codeActions from 'actions/promoCode';

const {
  InputRow,
  HeadeLine,
  BigText,
  FlexBoxesContainer,
  MainBlock,
  MainTitle,
  Box,
  SmallButton,
  SpcialAnnouncement
} = common;

const CodeInputField = () => (
  <div className='code-activation-form'>
    <InputRow.SmallInput>AGENCY CODE</InputRow.SmallInput>
    <SmallButton classes='primary-color'>Redeem</SmallButton>
  </div>
);

const PackageState = ({ level }) => {
  console.log(level)
  let packageType = level < 3 ? 'Premuim' : 'Agency'
  return <div className="package-level">{packageType}</div>
};

const Billing = ({ level, ...props }) => (
  <React.Fragment>
    <MainBlock title='LeadCart Plan' />
    <FlexBoxesContainer>
      <Box
        header={<HeadeLine>Your Package is :</HeadeLine>}
        content={(
          <BigText>
            <PackageState level={level} />
          </BigText>
        )}
        footer={(
          <FlexBoxesContainer classes={['space-between-elements']}>
            <div>
              <InputRow.Label>Nex billing date</InputRow.Label>
              <div>Dec 1, 2029</div>
            </div>
            <div>
              <SmallButton classes='green-color'>Active</SmallButton>
            </div>
          </FlexBoxesContainer>
        )}
      />
      <Box
        header={<HeadeLine>Redeem Codes:</HeadeLine>}
        content={(
          <span className='plan-card-action'>

            <CodeInputField onSubmit={console.log} />
          </span>
        )}
        footer={(
          <React.Fragment>
            <InputRow.Label
            notes='Redeem codes and to get more sub accounts access'
            >
              You Have Redeemed 0 out of 5       
          </InputRow.Label>
          </React.Fragment>
        )}
      />
    </FlexBoxesContainer>

    {/*<MainTitle>One-Time Charges</MainTitle>
    <Tabel>
      <Tabel.Head>
        <Tabel.HeadCell>Product Name</Tabel.HeadCell>
        <Tabel.HeadCell>Quantity</Tabel.HeadCell>
        <Tabel.HeadCell>Amount</Tabel.HeadCell>
        <Tabel.HeadCell>Status</Tabel.HeadCell>
        <Tabel.HeadCell>Date</Tabel.HeadCell>
      </Tabel.Head>
      <Tabel.Body>
        <Tabel.Row>
          <Tabel.Cell
            mainContent='-'
          />
          <Tabel.Cell
            mainContent='-'
          />
          <Tabel.Cell
            mainContent='-'
          />
          <Tabel.Cell>
            <SmallButton classes='gray-color'>UnKnown</SmallButton>
          </Tabel.Cell>
          <Tabel.Cell
            mainContent='-'
          />
        </Tabel.Row>
      </Tabel.Body>
    </Tabel>*/}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  level: state.user.user.level
});
export default connect(mapStateToProps, codeActions)(Billing);


/*
        footer={(
          <FlexBoxesContainer classes={['space-between-elements']}>
            <div>
              <InputRow.Label>Nex billing date</InputRow.Label>
              <div>Sep 25, 2018</div>
            </div>
            <div>
              <SmallButton classes='green-color'>Active</SmallButton>
            </div>
          </FlexBoxesContainer>
        )}
      />
      <Box
        content={(
          <span className='plan-card-action stick-note-icon'>
            <SpcialAnnouncement>want to change your plan?</SpcialAnnouncement>
            <SpcialAnnouncement classes={['blue-text']}>click here!</SpcialAnnouncement>
          </span>
        )}
*/
