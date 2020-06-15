import { StepperProps as UIStepperProps } from '@material-ui/core/Stepper';

export interface ButtonProps {
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  className?: string | undefined;
  children?: React.ReactNode;
  disabled?: boolean | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export type Step = {
  label: string | undefined;
  component: React.ReactElement;
  disabled: boolean | undefined;
};

export interface StepperProps {
  steps: Step[];
  setActiveStep: (activeStep: number) => void;
  activeStep: number;
  stepProps?: UIStepperProps;
}
