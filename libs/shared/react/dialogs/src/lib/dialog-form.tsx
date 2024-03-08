// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Children, useCallback, useState } from 'react';
import DialogSlideIn from './dialog-slide-in';

/* eslint-disable-next-line */
export interface DialogFormProps {
  open: boolean
}

export function DialogForm(props: DialogFormProps & { children?:React.ReactElement}) {
  const [open, setOpen] = useState(true);

  const handleClose = useCallback(
    () => {
      setOpen(!open);
    },
    [setOpen, open],
  )
  
  const actions = () => (
    <Button variant="text" color="inherit">save</Button>
  );

  return (
    <DialogSlideIn title="Form" actions={actions()} open={open} handleClose={handleClose}>
      {props.children}
    </DialogSlideIn>
  );
}

export default DialogForm;
