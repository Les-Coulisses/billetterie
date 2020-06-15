import React from 'react';
import { ButtonProps } from 'components/types';

import '../scss/buttons.scss';
import Button from './Button';

export default function ButtonPrimary(buttonProps: ButtonProps) {
  return <Button className='ButtonPrimary' {...buttonProps} />;
}
