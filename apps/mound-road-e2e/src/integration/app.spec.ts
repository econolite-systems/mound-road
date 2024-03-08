// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { getGreeting } from '../support/app.po';

describe('mound-road', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome mound-road');
  });
});
