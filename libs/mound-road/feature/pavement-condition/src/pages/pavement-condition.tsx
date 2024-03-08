// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import { PavementConditionStatus } from '@econolite/shared/react/pavement-condition';

/* eslint-disable-next-line */
export interface PavementConditionProps {}

export function PavementCondition(props: PavementConditionProps) {
  return (
    <Fade in={true} enter={true} exit={true}>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <PavementConditionStatus />
      </Container>
    </Fade>
  );
}

export default PavementCondition;
