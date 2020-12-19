import React, { useState } from 'react';
import clx from 'classnames';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import { Button } from 'components/common/Buttons';
import ProgressBarWithSteps from 'components/common/ProgressBarWithSteps';
import './style.css';

const MultipleStepForm = ({ steps, children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className='multi-step-form'>
      <ProgressBarWithSteps steps={steps} currentStep={currentStep} />

      <div className='multi-step-form__form-wrapper'>
        <div className='multi-step-form__steps-wrapper'>
          {
            React.Children.toArray(children).filter((o) => o).map((child, index) => child ? index === currentStep && (
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
                  className={clx('next-step-key primary-btn')}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                  <FaArrowAltCircleRight />
                </Button>
              )
          }
          <Button
            className={clx('back-step-key', { 'd-none': currentStep === 0 })}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <FaArrowAltCircleLeft />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleStepForm;
