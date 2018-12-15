import React, { Component } from 'react';
import common from 'components/common';
import Steps from 'components/Steps'
import ActiveStep from './ActiveStep'
import { connect } from 'react-redux'
import * as productAction from 'actions/product'
import './index1.css'
const { Button, MiniButton, ActivationSwitchInput } = common;
const steps = [
  {
    sub: 'checkoutPage', description: '', title: 'Checkout Templates', completed: true
  },
  {
    sub: 'mandatoryDetails', description: '', title: 'Mandatory Details', completed: false
  },
  {
    sub: 'boosters', title: 'Conversion Boosters', completed: false
  },
  {
    sub: 'payment', title: 'Payment Gateways', completed: false
  },
  {
    sub: 'fullfillment', title: 'FullFillment', completed: false
  },
  {
    sub: 'settings', title: 'Scripts / Pixels', completed: false
  },
  {
    sub: 'offer', title: 'Order Bump', completed: false
  },
  {
    sub: 'thankYouPage', title: 'Thank you page', completed: false
  },
];

class Product extends Component {
  state = {
    steps,
    currentStep: 'checkoutPage'
  }


  goToStep = (stepName) => {
    // const { steps } = this.state
    // for (var i = 0; i <= steps.length; i++) {
    //   // steps[i].completed = true
    //   if (steps[i].sub === stepName)
    //     break;
    // }

    this.setState({
      // steps,
      currentStep: stepName
    });
  }

  onPrevious = () => {
    const { currentStep, steps } = this.state;
    let previousId = 0;
    const step = steps.find(({ sub }, id) => {
      if (sub === currentStep) {
        previousId = id - 1;
        return true;
      }
    });
    console.log(step)

    if (previousId < 0) return;

    steps[previousId] && steps[previousId].sub && this.goToStep(steps[previousId].sub);
  }
  componentDidMount = () => {
    const { product } = this.props
    this.setState({
      steps: steps.map(({ completed, ...step }) => ({ ...step, completed: !!(product[step.sub] && product[step.sub].completed) }))
    })
    this.updateCurrentProductDetails()

  }
  updateCurrentProductDetails = () => {
    const productUrl = this.props.history.location.pathname.split('/')[2]
    this.props.getProduct(productUrl);
  }
  onNext = () => {
    const { currentStep, steps } = this.state;
    let nextId = 1;
    let step = {}
    console.log(currentStep)
    steps.map((step, id) => {

      if (step.sub === currentStep) {
        nextId = id + 1;
        return true;
      }
    });

    if (!(nextId <= 6)) return;

    steps[nextId] && steps[nextId].sub && steps[nextId - 1].completed && this.goToStep(steps[nextId].sub);
  };
  onChangesSave = (pageName) => {

    switch (pageName) {
      case 'details':
        return this.props.updateProductDetails({})
      case 'checkout':
        return this.props.updateProductCheckoutDesign()
      case 'payments':
        return this.props.updateProductPayment()
      case 'order':
        return this.props.updateProductOrderBump()
      case 'advanced':
        return this.props.updateProductAdvanceSetting()
    }
  }

  isNotValidNextStep = () => {
    const { currentStep, steps } = this.state;
    // steps.filter(({ sub, completed }) => sub === currentStep)[0].completed


    return !steps.filter(({ sub }) => sub === currentStep)[0].completed
  }

  render = () => {
    const { currentStep, steps } = this.state
    return (
      <div className='products-details-page'>
        <div className='products-controls-btns'>
          <Button onClick={this.onPreview} classes={['share-btn']}>
            <i className='fas fa-share-square' />
            Share Product
          </Button>
          <div className='product-toolbar-container'>
            <ActivationSwitchInput active />
            <MiniButton onClick={this.onPreview} classes='row-explor-btn' iconClass='fa-eye' />

          </div>
        </div>
        <Steps className='product-steps-process' steps={steps} currentStep={currentStep} onClick={this.goToStep} disabled={this.isNotValidNextStep()} />
        <ActiveStep currentStep={currentStep} />
        <div className='product-footer-controlls'>
          <Button onClick={this.onPrevious} classes={['orange-color']}>
            <i className='fas fa-chevron-left' />
            Previous
          </Button>
          <div className="left-side-product-btns">
            <Button onClick={() => this.props.updateProduct()} classes={['primary-color']}>
              <i class="fas fa-save"></i>
              Save
            </Button>
            <Button onClick={this.onNext} disabled={this.isNotValidNextStep()} classes={['primary-color']}>
              Next
            <i className='fas fa-chevron-right' />
            </Button>
          </div>
        </div>
      </div>
    )
  };
}
const mapStateToProps = ({ product, user }) => ({
  subdomain: user.user.subDomain,
  productUrl: product.mandatoryDetails.url,
  id: product._id,
  available: product.mandatoryDetails.available,
  product
})
export default connect(mapStateToProps, productAction)(Product);
