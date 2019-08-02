import React, { Component, Fragment } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { connect } from 'react-redux';
import * as codeActions from 'actions/promoCode';
import './styles.css';
import moment from 'moment';
import SubscriptionPackages from '../../../components/SubscriptionPackages';


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

class CodeInputField extends Component {
  state = {
    code: '',
    loading: false,
    success: false
  }

  componentDidUpdate (prevProps) {
    const { codesUsed, error, loading: globleLoading } = this.props;
    const { loading } = this.state;
    if (prevProps.codesUsed !== codesUsed && !error) {
      this.setState({
        loading: false,
        success: true,
        error: ''
      });
    }
    if (!globleLoading && loading) this.setState({ loading: false, success: false });
  }

  onCodeChange = ({ target: { value: code } }) => this.setState({ code })

  onSubmit = () => {
    const { code } = this.state;
    const { onSubmit } = this.props;
    if (code.trim().length > 5) {
      this.setState({ loading: true, error: '', success: false });
      onSubmit({ code });
    }
  }

  render () {
    const {
      onClick, isLoading, error, ...props
    } = this.props;
    const { loading, success } = this.state;
    return (
      <div className='code-activation-form'>
        <InputRow.SmallInput
          error={error}
          name='code'
          className={success ? ['valid'] : []}
          onChange={this.onCodeChange}
          success={success}
        >
          PROMO CODE

        </InputRow.SmallInput>
        <SmallButton
          disabled={loading}
          className={loading ? 'primary-color spinner' : 'primary-color'}
          onClick={this.onSubmit}
        >
          Redeem

        </SmallButton>
      </div>
    );
  }
}

const TrialCountDown = (props) => <span>end date</span>;
const PackageState = ({ type, trial: { trial, trialEndDate } = {} }) => (
  <div className='package-level'>
    {type}
    {trial && (
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
);

const Billing = ({
  packageType,
  activateAgencyCode,
  codesUsed,
  loading,
  errors = {},
  trial,
  trialEndDate,
  ...props
}) => (
  <Fragment>
    <MainBlock title='LeadCart Plan' />
    <FlexBoxesContainer className='billing-cards-container'>
      <FlexBoxesContainer /*  flex='column' */>
        <Box
          header={<HeadeLine>Your Package is :</HeadeLine>}
          content={(
            <BigText>
              <PackageState type={packageType} trial={{ trial, trialEndDate }} />
            </BigText>
          )}
          footer={(
            <FlexBoxesContainer className='space-between-elements'>
              <div>
                <InputRow.Label>Nex billing date</InputRow.Label>
                <div> ~ Eternity</div>
              </div>
              <div>
                <SmallButton className='green-color'>Active</SmallButton>
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
      </FlexBoxesContainer>
     { /*<SubscriptionPackages />*/}
    </FlexBoxesContainer>
  </Fragment>
);
const mapStateToProps = ({
  user: {
    user: {
      trial,
      trialEndDate,
      level = 0,
      packageType
    },
    activatedPromoCodes: codesUsed, errors
  },
  loading
}) => ({
  packageType,
  loading,
  level,
  trial,
  trialEndDate,
  codesUsed,
  errors: errors.code || {}
});
export default connect(mapStateToProps, codeActions)(Billing);
