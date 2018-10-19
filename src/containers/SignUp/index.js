import React, { Component } from 'react';
import { FormLogo } from 'components/common/logos';
import { connect } from 'react-redux'
import * as signupActions from 'actions/signup'

import './styles.css';

class SignUp extends Component {

  onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      company: e.target.company.value,
      subdomain: e.target.subdomain.value
    }
    this.props.signUp(newUser)
  }
  componentWillMount = () => this.props.isLoggedIn && this.props.history.push('/')

  render() {
     
    return (
      <div className='wrapper'>
        <FormLogo />
        <div className='logo-header'>
          <span className='login-header-title'>sign up</span>
          <div className='logo-description'>
            Contact Information
          </div>
        </div>
        <form className='form-container' onSubmit={this.onSubmit}>
          <div className='form-input name'><input name='username' /></div>
          <div className='form-input email'><input name='email' /></div>
          <div className='form-input company'><input name='company' /></div>
          <div className='w subdomain'>
            <input className='leadcart-user' name='subdomain' />
            <span>.leadcart.io</span>
          </div>
          <button  type='submit' className='form-submit'>next</button>
        </form>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  validationError: true || state.validation.signup
})


export default connect(mapStateToProps , signupActions )(SignUp);
