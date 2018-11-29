import React, { Component } from 'react';
import common from 'components/common';
import Steps from 'components/Steps'
import ActiveStep from './ActiveStep'
import './index1.css'
const { Button, MiniButton, ActivationSwitchInput } = common;;
const steps = [
  {
    sub: 'checkout', description: '', title: 'Checkout Templates', completed: true
  },
  {
    sub: 'product', description: '', title: 'Mandatory Details', completed: false
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
    sub: 'scripts', title: 'Scripts / Pixels', completed: false
  },
  {
    sub: 'bumbs', title: 'Order Bump', completed: false
  },
  {
    sub: 'thankyouPage', title: 'Thank you page', completed: false
  },
];

class Product extends Component {
  state = {
    steps,
    currentStep: 'checkout'
  }


  goToStep = (stepName) => {
    const { steps } = this.state
    for (var i = 0; i <= steps.length; i++) {
      steps[i].completed = true
      if (steps[i].sub === stepName)
        break;
    }

    this.setState({
      steps,
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

  onNext = () => {
    const { currentStep, steps } = this.state;
    let nextId = 1;
    let step = {}
    console.log(currentStep)
    steps.map((step, id) => {

      if (step.sub === currentStep) {
        console.log(step.sub)
        nextId = id + 1;
        return true;
      }
    });

    console.log('--------------------', steps[nextId].sub)
    if (!(nextId <= 6)) return;

    steps[nextId] && steps[nextId].sub && this.goToStep(steps[nextId].sub);
  };

  render = () => {

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
        <Steps className='product-steps-process' steps={this.state.steps} currentStep={this.state.currentStep} onClick={this.goToStep} />
        <ActiveStep currentStep={this.state.currentStep} />
        <div className='product-footer-controlls'>
          <Button onClick={this.onPrevious} classes={['orange-color']}>
            <i className='fas fa-chevron-left' />
            Previous
          </Button>
          <div className="left-side-product-btns">
            <Button onClick={this.onNext} classes={['primary-color']}>
            <i class="fas fa-save"></i>
              Save
            </Button>
            <Button onClick={this.onNext} classes={['primary-color']}>
              Next
            <i className='fas fa-chevron-right' />
            </Button>
          </div>
        </div>
      </div>
    )
  };
}

export default Product;
