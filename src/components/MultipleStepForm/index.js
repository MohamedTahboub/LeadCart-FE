import React, { useState } from 'react';
import { Button } from 'components/common/Buttons';
import clx from 'classnames';

import './style.css';

const MultipleStepForm = ({ steps, children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className='multi-step-form'>
      <div className='multi-step-form__step-tabs'>
        {
          steps.map((step, index) => (
            <div className={clx('multi-step-form__step-tabs__tab', { active: index === currentStep })}>
              {step}
            </div>
          ))
        }
      </div>
      <div className='multi-step-form__form-wrapper'>
        <div className='multi-step-form__steps-wrapper'>
          {
            React.Children.toArray(children).filter((o) => o).map((child, index) => child ? (
              <div className={clx('multi-step-form__step', { active: index === currentStep })}>
                {child}
              </div>
            ) : null)
          }
        </div>
        <div className='multi-step-form__controllers'>
          {
            currentStep >= steps.length - 1 ?
              <span /> :
              (
                <Button
                  className={clx('next-step-key btn-primary')}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              )
          }
          <Button
            className={clx('next-step-key', { 'd-none': currentStep === 0 })}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleStepForm;
