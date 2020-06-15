import React from 'react';
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
import Stepper from 'components/Stepper/Stepper';
import { Step } from 'components/types';

interface StepperOrderProps {
  shows: ShowDto[];
}

const getSteps = (order: OrderDto, shows: ShowDto[]): Step[] => {
  const steps: Step[] = [];
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
  const [order, , activeStep, setActiveStep] = useOrderContext();

  const steps = getSteps(order, shows);

  return (
    <Stepper
      steps={steps}
      setActiveStep={setActiveStep}
      activeStep={activeStep}
    />
  );
}
