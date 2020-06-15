import { StepperProps as MuiStepperProps } from '@material-ui/core/Stepper';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
import { ModalProps as MuiModalProps } from '@material-ui/core/Modal';
import { ToolbarProps as MuiToolbarProps } from '@material-ui/core/Toolbar';

export interface ButtonProps extends MuiButtonProps {}
export interface DialogProps extends MuiDialogProps {
  rounded?: boolean;
}
export interface ToolbarProps extends MuiToolbarProps {}

export type Step = {
  label?: string;
  component: React.ReactElement;
  disabled?: boolean;
};

export interface StepperProps extends MuiStepperProps {
  setActiveStep: (activeStep: number) => void;
  activeStep: number;
  children: Step[];
}
