import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShowsStep from './Steps/ShowsStep/ShowsStep';
import PlacesStep from './Steps/PlacesStep/PlacesStep';
import PerformancesStep from './Steps/PerformancesStep/PerformancesStep';
import { useOrderContext } from '../../hooks/OrderContext';
import OrderStep from './Steps/OrderStep/OrderStep';
import useFetchShows from '../../hooks/useFetchShows';

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

function getSteps(order) {
  const steps = [];
  steps.push(order.show !== undefined ? order.show.title : 'Spectacles');
  steps.push(
    order.performance !== undefined
      ? order.performance.date.french
      : 'Représentations'
  );
  steps.push(
    order.places === undefined || order.places.length === 0
      ? 'Places'
      : order.places.length + ' place' + (order.places.length > 1 ? 's' : '')
  );
  steps.push('Informations');

  return steps;
}

export default function StepperOrder() {
  const [order, setOrder] = useOrderContext();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps(order);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <ShowsStep goNext={handleNext} />;
      case 1:
        return <PerformancesStep goNext={handleNext} />;
      case 2:
        return <PlacesStep goNext={handleNext} />;
      case 3:
        return <OrderStep goNext={handleNext} />;
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
            <Button onClick={handleReset}>Reset</Button>
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
