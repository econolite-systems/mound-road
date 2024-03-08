// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';
import './styles/message-modal.scss';
import MessageForm from './message-form';
import { ItisCodeType, TimRequest } from '@econolite/shared/data-access/api-tim';

const addMessageSchema = object().shape({
  
});
const defaultValues = {
  id: '',
  message: '',
  itis: 0,
  locations: []
};

export interface MessageLocation {
  id: string,
  name: string
}

export interface ItisCode {
  id: number,
  name: string
}

export interface MessageFormInput {
  id: string,
  message?: string;
  itis?: number;
  locations?: string[];
}

export interface MessageModalProps {
  isShowing: boolean;
  isLoading: boolean;
  isError: boolean;
  itisCodeTypes: ItisCodeType[];
  locations: MessageLocation[];
  onClose: () => void;
  onSave: (data: TimRequest ) => void;
}

export function MessageModal(props: MessageModalProps) {
  const resolver = yupResolver(addMessageSchema)
  const methods = useForm<TimRequest>({ resolver, defaultValues });
  const { handleSubmit, reset, control } = methods;

  useEffect(() => {
    if (!props.isShowing) return;
    reset(defaultValues);
  }, [props.isShowing, reset]);

  const locationOptions = useMemo(() => props.locations.map(
    ({ id, name }) => ({ label: name, value: id })
  ), [props.locations]);

  const transmitModes = [{label: "Continuous", value: "Continuous"}, {label: "Alternating", value: "Alternating"}]

  const actions = (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={handleSubmit(props.onSave)}
      disabled={props.isLoading}
    >
      Save
    </Button>
  );

  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title={`Create Message`}
        open={props.isShowing}
        handleClose={props.onClose}
        actions={actions}
      >
        <div className="message-modal">
          {props.isError &&
            <Alert severity="error">Something went wrong. Please refresh and try again.</Alert>}

          <MessageForm transmitModes={transmitModes} itisCodesTypes={props.itisCodeTypes} targets={locationOptions}/>
        </div>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default MessageModal;
  
