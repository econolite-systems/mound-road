// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  MessageConfig,
} from '@econolite/shared/react/traveler-messages';

import { Theme } from '@mui/material/styles';
import { Container, Fade, Paper } from '@mui/material';

export function Tim() {
  return (
    <Fade in={true} enter={true} exit={true}>
      <Container sx={(theme:Theme) => ({display: 'flex', flexDirection: 'column'})}>
        <MessageConfig />
      </Container>
    </Fade>
  );
}

export default Tim;
