import React from 'react';
import Step from 'semantic-ui-react/dist/commonjs/elements/Step';
import './style.css';


const isThePrevStepCompleted = (step, steps) => {
  const prevPosition = steps.indexOf(step) - 1;

  const isPrevCompleted = steps[prevPosition] ? steps[prevPosition].completed : false;
  const isCurrentCompleted = step.completed;

  return isCurrentCompleted || isPrevCompleted;
};

const isProductActive = (step, steps) => {
  if (step.sub === 'checkoutPage' || step.sub === 'mandatoryDetails') return true;
  const t = steps.filter(({ sub, completed }) => (sub === 'checkoutPage' || sub === 'mandatoryDetails'))
    .filter((c) => c.completed).length === 2;
  console.log(step.sub, t);
  return t;
};
const Steps = ({
  steps, activePage, currentStep, disabled, onClick, ...props
}) => (
  <Step.Group ordered>
    {steps.map((step) => {
      const isDisabled = !isProductActive(step, steps);
      return (
        <Step
          completed={!isDisabled && step.completed}
          active={step.sub === currentStep && !isDisabled}
          disabled={isDisabled}
          onClick={() => onClick(step.sub)}
        >
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
