import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';

import '../scss/buttons.scss';
import { DialogProps } from '../types';

export default function Dialog(dialogProps: DialogProps) {
  const classes =
    dialogProps.className === undefined ? '' : dialogProps.className;
  return (
    <MuiDialog
      {...{
        ...dialogProps,
        className: classes + ' CoulissesModal'
      }}
    >
      {dialogProps.children}
    </MuiDialog>
  );
}
