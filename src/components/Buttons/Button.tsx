import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

import '../scss/buttons.scss';
import { ButtonProps } from 'components/types';

export default function Button(buttonProps: ButtonProps) {
  const classes =
    buttonProps.className === undefined ? '' : buttonProps.className;
  return (
    <MuiButton
      {...{
        ...buttonProps,
        className: classes + ' CoulissesButton'
      }}
    >
      {buttonProps.children}
    </MuiButton>
  );
}
