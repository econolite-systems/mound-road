// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback } from 'react';

/* eslint-disable-next-line */
export interface DeleteConfirmModalProps {
  isShowing: boolean;
  type?: string;
  name?: string;
  toggle: () => void;
  onClose: (confirm: boolean) => void;
}

export function DeleteConfirmModal(props: DeleteConfirmModalProps) {
  const close = useCallback(
    (confirmed: boolean) => {
      props.onClose(confirmed);
      props.toggle();
    },
    [props]
  );

  return (
    <Dialog open={props.isShowing}>
      <DialogTitle>Delete {props.type}</DialogTitle>
      <DialogContent>
        Do you really want to delete <b>{props.name && ' ' + props.name}</b>?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => close(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => close(true)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmModal;
