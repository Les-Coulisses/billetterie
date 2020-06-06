import React, { Dispatch, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShowsStep from './Steps/ShowsStep/ShowsStep';
import PlacesStep from './Steps/PlacesStep/PlacesStep';
import PerformancesStep from './Steps/PerformancesStep/PerformancesStep';
import OrderStep from './Steps/OrderStep/OrderStep';
import { OrderDto, ShowDto } from 'types';
import { useOrderContext } from '../../hooks/OrderContext';

interface StepperOrderProps {
  shows: ShowDto[];
}

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

const getSteps = (order: OrderDto): (string | undefined)[] => {
  return [
    order.show?.title !== undefined ? order.show.title : 'Spectacles',
    order.performance?.date?.french !== undefined
      ? order.performance.date.french
      : 'Représentations',
    order.places.length === 0
      ? 'Places'
      : order.places.length + ' place' + (order.places.length > 1 ? 's' : ''),
    'Informations'
  ];
};

export default function StepperOrder({ shows }: StepperOrderProps) {
  const classes = useStyles();
  const [order, , activeStep, setActiveStep] = useOrderContext();
  console.log('render stepper');

  const steps = getSteps(order);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <ShowsStep goNext={handleNext} shows={shows} />;
      case 1:
        return <PerformancesStep goNext={handleNext} goPrev={handleBack} />;
      case 2:
        return <PlacesStep goNext={handleNext} goPrev={handleBack} />;
      case 3:
        return <OrderStep />;
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
          <div>
            {activeStep !== 0 && (
              <Button onClick={handleBack} className={classes.backButton}>
                Retour
              </Button>
            )}
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}
