import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';

import { DialogProps } from '../types';
import '../scss/dialog.scss';

export default function Dialog(dialogProps: DialogProps) {
  let classes =
    dialogProps.className === undefined ? '' : dialogProps.className;
  classes += dialogProps.rounded === true ? ' CoulissesRoundedDialog ' : '';
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
