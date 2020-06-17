import React from 'react';
import { ButtonProps } from 'components/types';

import '../scss/buttons.scss';
import Button from './Button';

export default function ButtonGoldOutlined(buttonProps: ButtonProps) {
  const classes =
    buttonProps.className === undefined ? '' : buttonProps.className;
  return (
    <Button
      {...{
        ...buttonProps,
        className: classes + 'CoulissesButtonOutlinedGold '
      }}
    />
  );
}
