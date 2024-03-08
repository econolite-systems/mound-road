// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });
});
