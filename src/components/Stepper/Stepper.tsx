import React from 'react';
import {
  Stepper as UIStepper,
  Step as UIStep,
  StepButton as UIStepButton,
  StepLabel as UIStepLabel
} from '@material-ui/core';

import '../scss/buttons.scss';
import { StepperProps } from 'components/types';

export default function Stepper({
  steps = [],
  setActiveStep,
  activeStep
}: StepperProps) {
  const getStepContent = (index: number): React.ReactElement | string => {
    if (index < 0 || index >= steps.length) {
      return "Erreur, cette étape n'existe pas";
    }
    return steps[index].component;
  };

  return (
    <div>
      <UIStepper>
        {steps.map((stepItem, index) => (
          <UIStep key={index}>
            <UIStepButton
              onClick={() => {
                setActiveStep(index);
              }}
              disabled={stepItem.disabled}
            >
              <UIStepLabel>{stepItem.label}</UIStepLabel>
            </UIStepButton>
          </UIStep>
        ))}
      </UIStepper>
      <div>
        <div>{getStepContent(activeStep)}</div>
      </div>
    </div>
  );
}
