// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { ReactNode } from 'react';

export function SortableItem({id, disabled = false, before = false, children}: { id: string, disabled?: boolean, before?: boolean, children: ReactNode }) {
  let zIndex = 1;
  let raised = false;

  const {active, attributes, listeners, setNodeRef, transform, transition} = useSortable({id: id});

  if ( active?.id === id ) {
    zIndex = 2000;
    raised = true;
  }

  const style = {
    zIndex: zIndex,
    transform: CSS.Transform.toString(transform),
    transition,
    alignItems: 'center'
  }

  return (
    <Card key={id} raised={raised} sx={{position:'relative', display: 'flex', justifyContent: 'space-between', m: 2, p: 2}} ref={setNodeRef} style={style}>
      {!before && children}
      {!disabled &&
        <IconButton sx={{width: 8, height: 8}} aria-label='drag to move item' {...listeners} {...attributes} size='large' ><DragIndicatorIcon/></IconButton>
      }
      {before && children}
    </Card>
  )
}
