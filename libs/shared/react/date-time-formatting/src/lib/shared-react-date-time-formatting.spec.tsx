// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { render } from '@testing-library/react';

import SharedReactDateTimeFormatting from './shared-react-date-time-formatting';

describe('SharedReactDateTimeFormatting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedReactDateTimeFormatting />);
    expect(baseElement).toBeTruthy();
  });
});
