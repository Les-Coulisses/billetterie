import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';

import { DialogProps } from '../types';

export default function Dialog(dialogProps: DialogProps) {
  const classes =
    dialogProps.className === undefined ? '' : dialogProps.className;
  return (
    <MuiDialog
      {...{
        ...dialogProps,
        className: classes + 'CoulissesDialog '
      }}
    >
      {dialogProps.children}
    </MuiDialog>
  );
}
