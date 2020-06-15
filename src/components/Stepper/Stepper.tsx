import React from 'react';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepButton as MuiStepButton,
  StepLabel as MuiStepLabel
} from '@material-ui/core';

import '../scss/stepper.scss';
import { StepperProps, Step } from 'components/types';

export default function Stepper(props: StepperProps) {
  const steps: Step[] = props.children;
  const getStepContent = (index: number): React.ReactElement | string => {
    if (index < 0 || index >= steps.length) {
      return "Erreur, cette étape n'existe pas";
    }
    return steps[index].component;
  };

  return (
    <>
      <MuiStepper className='CoulissesStepper' {...props}>
        {steps.map((stepItem, index) => (
          <MuiStep key={index}>
            <MuiStepButton
              onClick={() => {
                props.setActiveStep(index);
              }}
              disabled={stepItem.disabled}
            >
              <MuiStepLabel>{stepItem.label}</MuiStepLabel>
            </MuiStepButton>
          </MuiStep>
        ))}
      </MuiStepper>
      <div>
        <div>{getStepContent(props.activeStep)}</div>
      </div>
    </>
  );
}
