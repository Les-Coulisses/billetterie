import React from 'react';
import { Button as UIButton } from '@material-ui/core';

import '../scss/buttons.scss';
import { ButtonProps } from 'components/types';

export default function Button(buttonProps: ButtonProps) {
  return <UIButton {...buttonProps}>{buttonProps.children}</UIButton>;
}
