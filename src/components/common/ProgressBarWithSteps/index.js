import React, { Fragment } from 'react';
import clx from 'classnames';
import { FaCheck } from 'react-icons/fa';

import './style.css';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className='progress-container'>

      <section className='progress-steps'>
        {steps.map((ele, i) => (
          <Fragment>
            {
              (i + 1) === steps.length ?
                <div className={clx('progress-one-step', { activeCircle: i <= currentStep })}>
                  <span className='progress-circle'>{i + 1 > currentStep ? i + 1 : <FaCheck />}</span>
                </div>
                :
                <div className={clx('progress-one-step', { activeCircle: i <= currentStep })} style={{ width: `${100 / (steps.length - 1)}%` }}>
                  <span className='progress-circle'>{i + 1 > currentStep ? i + 1 : <FaCheck />}</span>
                  <span className={clx('progress-line', { activeLine: i <= currentStep - 1 })} />
                </div>
            }
          </Fragment>
        ))}
      </section>

      <section className='progress-titles'>
        {
          steps.map((step, index) => (
            <div className={clx('progress-one-title', { active: index === currentStep })}>
              {step}
            </div>
          ))
        }
      </section>
    </div >
  );
};

export default ProgressBar;
