// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DeleteConfirmModal, useConfirmModal } from '@econolite/modal';
import { useCallback, useEffect } from 'react';

/* eslint-disable-next-line */
export interface DeleteActionConfirmModalProps {
  isShowing: boolean;
  toggle: () => void;
  id: string | number;
  setId: (value: string | number) => void;
  type: string;
  setType: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  onDelete: (id: string) => void;
}

export function DeleteActionConfirmModal({ isShowing, toggle, id, setId, type, setType, name, setName, onDelete }: DeleteActionConfirmModalProps) {
  useEffect(() => {
    setType(type)
    setName(name)
  }, [type, setType, name, setName])

  useEffect(() => {
    setId(id)
    if (!isShowing && id !== '') {
      toggle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onClose = useCallback((confirm: boolean) => {
    if (confirm) {
      onDelete(id as string);
    }
    setId('');
  },
    [id, onDelete]
  );

  return (
    <DeleteConfirmModal
      isShowing={isShowing}
      type={type}
      name={name}
      toggle={toggle}
      onClose={onClose}
    />
  );
}

export default DeleteActionConfirmModal;
