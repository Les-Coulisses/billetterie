import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import ShowsStep from './Steps/ShowsStep/ShowsStep';
import PlacesStep from './Steps/PlacesStep/PlacesStep';
import PerformancesStep from './Steps/PerformancesStep/PerformancesStep';
import OrderStep from './Steps/OrderStep/OrderStep';
import { OrderDto, ShowDto } from 'types';
import { useOrderContext } from '../../hooks/OrderContext';
import {
  hasToDisplayShowStep,
  getShowLabel,
  hasToDisplayPerformanceStep,
  getPerformanceLabel,
  getPlaceLabel
} from './utils';

interface StepperOrderProps {
  shows: ShowDto[];
}

type OrderStepProps = {
  disabled: boolean;
  label: string;
  component: ReactElement;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: 'white'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const getSteps = (order: OrderDto, shows: ShowDto[]): OrderStepProps[] => {
  const steps: OrderStepProps[] = [];
  if (hasToDisplayShowStep(shows)) {
    steps.push({
      disabled: false,
      label: getShowLabel(order),
      component: <ShowsStep shows={shows} />
    });
  }

  if (hasToDisplayPerformanceStep(order)) {
    steps.push({
      disabled: order.show === undefined,
      label: getPerformanceLabel(order),
      component: <PerformancesStep />
    });
  }

  steps.push({
    disabled: order.performance === undefined,
    label: getPlaceLabel(order),
    component: <PlacesStep />
  });

  steps.push({
    disabled: order.places.length === 0,
    label: 'Informations',
    component: <OrderStep />
  });

  return steps;
};

export default function StepperOrder({ shows }: StepperOrderProps) {
  const classes = useStyles();
  const [order, , activeStep, setActiveStep] = useOrderContext();

  const steps = getSteps(order, shows);

  const getStepContent = (stepIndex: number) => {
    const step: OrderStepProps | undefined = steps[stepIndex];
    if (step === undefined) {
      return 'Unknown step';
    }

    return step.component;
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((stepItem, index) => (
          <Step key={index}>
            <StepButton
              onClick={() => {
                setActiveStep(index);
              }}
              disabled={stepItem.disabled}
            >
              <StepLabel>{stepItem.label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
          </div>
        ) : (
          <div>{getStepContent(activeStep)}</div>
        )}
      </div>
    </div>
  );
}
