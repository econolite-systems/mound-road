// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { action } from "@storybook/addon-actions";
import { S as StoryFnReactReturnType } from "@storybook/react/dist/types-0a347bb9.js";
import { VFC, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

const StorybookFormProvider: VFC<{ schema?: AnyObjectSchema, children: ReactNode }> = ({ schema, children }) => {
  const input = schema ? {resolver: yupResolver(schema), defaultValues: schema.cast({}) } : {};
  const methods = useForm(input);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const withRHF = (showSubmitButton: boolean, schema?: AnyObjectSchema ) => (
  Story: FC
): StoryFnReactReturnType => (
  <StorybookFormProvider schema={schema}>
    <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 1}}>
      <Story />
      {showSubmitButton && <Button type="submit" variant="contained">Submit</Button>}
    </Box>
  </StorybookFormProvider>
);
