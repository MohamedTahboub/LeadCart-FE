import React from 'react';
import Step from 'semantic-ui-react/dist/commonjs/elements/Step';
import './style.css';


const isThePrevStepCompleted = (step, steps) => {
  const prevPosition = steps.indexOf(step) - 1;

  const isPrevCompleted = steps[prevPosition] ? steps[prevPosition].completed : false;
  const isCurrentCompleted = step.completed;

  return isCurrentCompleted || isPrevCompleted;
};
const Steps = ({
  steps, activePage, disabled, onClick, ...props
}) => (
  <Step.Group ordered>
    {steps.map((step) => {
      const isDisabled = !isThePrevStepCompleted(step, steps);
      return (
        <Step completed={step.completed} disabled={isDisabled} onClick={() => onClick(step.sub)}>
          <Step.Content>
            <Step.Title>{step.title}</Step.Title>
            {step.description && <Step.Description>{step.description}</Step.Description>}
          </Step.Content>
        </Step>
      );
    })}
  </Step.Group>
);

export default Steps;
