import React, { Fragment } from 'react';
import clx from 'classnames';
import { FaCheck } from 'react-icons/fa';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className='progress-container'>

      <section className='progress-steps'>
        {steps.map((ele, i) => (
          <Fragment>
            {(i + 1) === steps.length ?
              <div className={clx('progress-one-step', { activeCircle: i <= currentStep })}>
                <span className='progress-circle'>{i + 1 > currentStep ? i + 1 : <FaCheck />}</span>
              </div>
              :
              <div className={clx('progress-one-step', { activeCircle: i <= currentStep })} style={{ width: `${100 / steps.length}%` }}>
                <span className='progress-circle'>{i + 1 > currentStep ? i + 1 : <FaCheck />}</span>
                <span className='progress-line' />
              </div>}
          </Fragment>
        ))}
      </section>


      <section className='multi-step-form__step-tabs progress-titles'>
        {
          steps.map((step, index) => (
            <div className={clx('multi-step-form__step-tabs__tab', { active: index === currentStep })}>
              {step}
            </div>
          ))
        }
      </section>
    </div >
  );
};

export default ProgressBar;
