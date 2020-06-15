import React from 'react';
import { Toolbar as MuiToolbar } from '@material-ui/core';

import '../scss/toolbar.scss';
import { ToolbarProps } from '../types';

export default function Toolbar(toolBarProps: ToolbarProps) {
  const classes =
    toolBarProps.className === undefined ? '' : toolBarProps.className;
  return (
    <MuiToolbar
      {...{
        ...toolBarProps,
        className: classes + ' CoulissesToolbar'
      }}
    >
      {toolBarProps.children}
    </MuiToolbar>
  );
}
