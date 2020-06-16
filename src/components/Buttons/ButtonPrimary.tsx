import React from 'react';
import { ButtonProps } from 'components/types';

import '../scss/buttons.scss';
import Button from './Button';

export default function ButtonPrimary(buttonProps: ButtonProps) {
  const classes =
    buttonProps.className === undefined ? '' : buttonProps.className;
  return (
    <Button
      {...{
        ...buttonProps,
        className: classes + 'CoulissesButtonPrimary '
      }}
    />
  );
}
