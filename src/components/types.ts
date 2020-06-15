import { StepperProps as MuiStepperProps } from '@material-ui/core/Stepper';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';

export interface ButtonProps extends MuiButtonProps {}
export interface DialogProps extends MuiDialogProps {}

export type Step = {
  label: string | undefined;
  component: React.ReactElement;
  disabled: boolean | undefined;
};

export interface StepperProps extends MuiStepperProps {
  setActiveStep: (activeStep: number) => void;
  activeStep: number;
  children: Step[];
}
