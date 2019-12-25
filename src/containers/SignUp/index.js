import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';

//Components
import CustomInputField from 'components/CustomInputField';
import { FormLogo } from 'components/common/logos';
import SoftwareFeature from 'components/SoftwareFeature';

import { freeTrailSignup } from 'libs/validation';
import './styles.css';

//Images
import ClientApp from 'assets/images/Client-App.png';
import LeadCartLogo from 'assets/images/brands/leadcart-white-color.png';
import Star from 'assets/images/star.png';
import DottedSquare from 'assets/images/dotted-square.png';
import Snake from 'assets/images/snake.png';
import Rectangle from 'assets/images/rectangle.png';
import CircularSection from 'assets/images/circular-section.png';
import SmallCircularSection from 'assets/images/small-circular-section.png';
import StripedCircle from 'assets/images/striped-circle.png';
import LeadcartSquare1 from 'assets/images/leadcart-square-1.png';
import LeadcartSquare2 from 'assets/images/leadcart-square-2.png';

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

  onChange = ({ target: { name } }) => {
    this.setState({
      errors: { ...this.state.errors, [name]: '', message: '' }
    });
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
        <img src={LeadcartSquare1} className="leadcart-square-1" />
        <img src={LeadcartSquare2} className="leadcart-square-2" />
        <div className="signup-container">
          <img src={LeadCartLogo} className="signup-leadcart-logo" />
          <img src={Star} className="star star-1" />
          <img src={Star} className="star star-2" />
          <img src={DottedSquare} className="dotted-square" />
          <img src={Snake} className="snake snake-1" />
          <img src={Snake} className="snake snake-2" />
          <img src={Rectangle} className="rectangle" />
          <img src={CircularSection} className="circular-section" />
          <img src={SmallCircularSection} className="small-circular-section" />
          <img src={StripedCircle} className="striped-circle" />
          <div>
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
                  placeholder='your first name'
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <CustomInputField
                  name='lastName'
                  label='Last Name'
                  placeholder='your last name'
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
