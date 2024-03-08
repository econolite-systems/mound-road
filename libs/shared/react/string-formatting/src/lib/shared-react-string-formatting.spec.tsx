// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { render } from '@testing-library/react';

import SharedReactStringFormatting from './shared-react-string-formatting';

describe('SharedReactStringFormatting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedReactStringFormatting />);
    expect(baseElement).toBeTruthy();
  });
});
