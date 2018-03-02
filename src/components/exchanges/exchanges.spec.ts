import { render } from '@stencil/core/testing';
import { Exchanges } from './exchanges';

describe('exchanges', () => {
  it('should build', () => {
    expect(new Exchanges()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [Exchanges],
        html: '<exchanges></exchanges>'
      });
    });
  });
});
