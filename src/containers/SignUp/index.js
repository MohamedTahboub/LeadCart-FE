import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';

//Components
import CustomInputField from 'components/CustomInputField';
import { LeadcartSquare, BackgroundImagesPart1, BackgroundImagesPart2 } from './Components/index';
import { FormLogo } from 'components/common/logos';
import SoftwareFeature from 'components/SoftwareFeature';

import { freeTrailSignup } from 'libs/validation';
import './styles.css';

//Images
import ClientApp from 'assets/images/Client-App.png';
import LeadCartLogo from 'assets/images/brands/leadcart-white-color.png';

class SignUp extends Component {
  state = { success: false, processing: false, errors: {} }

  componentDidUpdate = () => this.props.isLoggedIn && this.props.history.push('/')

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        companyName: e.target.company.value,
        password: e.target.password.value,
        subDomain: e.target.subdomain.value
      };

      const { isValid, value, errors } = await freeTrailSignup(newUser);

      if (!isValid) return this.setState({ errors });
      this.setState({ processing: true });
      this.props.signUp(
        value,
        {
          trial: true,
          onSuccess: (m) => {
            this.setState({ success: true, processing: false });
          },
          onFailed: (error) => {
            this.setState({ success: false, errors: { message: error }, processing: false });
          }
        }
      );
    } catch ({ message = '' }) {
      // if (message.includes('Cannot read property')) message = 'Please check your fields and try again';
      this.setState({ success: false, errors: { message }, processing: false });
    }
  }

  onChange = ({ target }, { current }) => {
    this.setState({
      errors: { ...this.state.errors, [target.name]: '', message: '' }
    });

    if (target.value != "") current.style.display = "none";
    else if (document.activeElement == target) current.style.display = "block";
    else current.style.display = "";
  }

  render () {
    // const { validationError: errors, signupError } = this.props;
    const { success, errors = {}, processing } = this.state;

    if (success) {
      return (
        <div className='account-verify-page'>
          <div className='verified-message-container'>
            <i className='fas fa-check-circle' />
            <span className='verified-label'>
              You Have signed up successfully,
              <br />
              please check your inbox to verify your account .
            </span>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <LeadcartSquare />
        <div className="signup-container">
          <img src={LeadCartLogo} className="signup-leadcart-logo" />
          <BackgroundImagesPart1 />
          <div className="leadcart-desc">
            <div className="free-trial">
              Start your free trial
            </div>
            <div className="free-trial-desc">
              Simple,Yet Powerful Cart Solution To Help You Convert More Sales & Maximize Profits.
            </div>
            <div className="software-features">
              <SoftwareFeature text="+6 Checkout Templates." />
              <SoftwareFeature text="Unlimited Products." />
              <SoftwareFeature text="Built In Credit Card & PayPal processors." />
              <SoftwareFeature text="Use Checkout Pages Everywhere." />
              <SoftwareFeature text="One-Time Payments, Subscriptions, Trials, & Payment Plans." />
              <SoftwareFeature text="Webhooks & Zapier." />
              <SoftwareFeature text="1-Click Upsells." />
              <SoftwareFeature text="Unlimited Funnels." />
              <SoftwareFeature text="Priority Support." />
            </div>
          </div>
          <div className="wrapper-box">
            <img src={ClientApp} className="client-app-images" />
            <BackgroundImagesPart2 />
            <div className='wrapper'>
              <div className='logo-header'>
                <FormLogo />
                <span className='login-header-title'>sign up</span>
                <span className='login-header-message'>
                  free trial for 7 days
                  {' '}
                  <a href='https://leadcart.io' target='_blank' rel="noopener noreferrer">
                    on leadcart
                  </a>
                </span>
              </div>
              <form className='form-container' onSubmit={this.onSubmit}>
                <CustomInputField
                  name='firstName'
                  label='First Name'
                  placeholder='Type your first name'
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <CustomInputField
                  name='lastName'
                  label='Last Name'
                  placeholder='Type your last name'
                  onChange={this.onChange}
                  error={errors.lastName}
                />
                <CustomInputField
                  name='email'
                  label='Email address'
                  placeholder='Enter your email address'
                  onChange={this.onChange}
                  error={errors.email}
                />
                <CustomInputField
                  name='password'
                  label='Password'
                  type='password'
                  placeholder='Set a strong password'
                  onChange={this.onChange}
                  error={errors.password}
                />
                <CustomInputField
                  name='company'
                  label='Company Name'
                  placeholder='Set the Company Name'
                  onChange={this.onChange}
                  error={errors.company}
                />
                <div className='w subdomain'>
                  <input className='leadcart-user' name='subdomain' />
                  <span className='main-domain-suffix'>.leadcart.io</span>
                  {errors.subdomain && <span className='input-feild-error'>{errors.subdomain}</span>}
                </div>
                {errors.message && <span className='signup-error-field'>{errors.message}</span>}
                <button type='submit' disabled={processing} className={`form-submit ${processing ? 'spinner' : ''}`}> Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn
});


export default connect(mapStateToProps, signupActions)(SignUp);
