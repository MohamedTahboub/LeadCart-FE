import React from 'react';
import Step from 'semantic-ui-react/dist/commonjs/elements/Step';
import './style.css';

const Steps = ({
  steps, activePage, onClick, ...props
}) => (
  <Step.Group ordered>
    {steps.map((step) => (
      <Step completed={step.completed} onClick={() => onClick(step.sub)}>
        <Step.Content>
          <Step.Title>{step.title}</Step.Title>
          {step.description && <Step.Description>{step.description}</Step.Description>}
        </Step.Content>
      </Step>
    ))}
  </Step.Group>
);

export default Steps;
