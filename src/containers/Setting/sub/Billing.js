import React, { Component } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { connect } from 'react-redux';
import * as codeActions from 'actions/promoCode';
import './styles.css';

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

class CodeInputField extends Component {
  state = {
    code: '',
    loading: false,
    success: false
  }

  componentDidUpdate(prevProps) {
    const { codesUsed, error, loading: globleLoading } = this.props;
    console.log('Loading', globleLoading);
    const { loading } = this.state;
    if (prevProps.codesUsed !== codesUsed && !error) {
      this.setState({
        loading: false,
        success: true,
        error: ''
      });
    }
    if (!globleLoading && loading) this.setState({ loading: false ,success: false });
  }

  onCodeChange = ({ target: { value: code } }) => this.setState({ code })

  onSubmit = () => {
    const { code } = this.state;
    const { onSubmit } = this.props;
    if (code.trim().length > 5) {
      this.setState({ loading: true, error: '' ,success: false});
      onSubmit({ code });
    }

    console.log(code);
  }

  render() {
    const {
      onClick, isLoading, error, ...props
    } = this.props;
    const { loading, success } = this.state;
    return (
      <div className='code-activation-form'>
        <InputRow.SmallInput
          error={error}
          name='code'
          classes={success ? ['valid'] : []}
          onChange={this.onCodeChange}
          success={success}
        >
          AGENCY CODE

        </InputRow.SmallInput>
        <SmallButton
          disabled={loading}
          classes={loading ? 'primary-color spinner' : 'primary-color'}
          onClick={this.onSubmit}
        >
          Redeem

        </SmallButton>
      </div>
    );
  }
}

const PackageState = ({ level }) => {
  console.log(level);
  const packageType = level < 3 ? 'Premium' : 'Agency';
  return <div className='package-level'>{packageType}</div>;
};

const Billing = ({
  level, activateAgencyCode, codesUsed, loading, errors = {}, ...props
}) => (
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

              <CodeInputField
                onSubmit={activateAgencyCode}
                error={errors.message}
                loading={loading}
              />
            </span>
          )}
          footer={(
            <React.Fragment>
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
                out of {codesUsed > 5 ? codesUsed : 5} codes
            </InputRow.Label>
            </React.Fragment>
          )}
        />
      </FlexBoxesContainer>

      {/* <MainTitle>One-Time Charges</MainTitle>
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
    </Tabel> */}
    </React.Fragment>
  );

const mapStateToProps = ({ user: { user: { level = 0 }, activatedPromoCodes: codesUsed, errors }, loading }) => ({
  loading,
  level,
  codesUsed,
  errors: errors.code || {}
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
