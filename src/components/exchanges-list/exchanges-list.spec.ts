import { render } from '@stencil/core/testing';
import { ExchangesView } from './exchanges-list';

describe('exchanges', () => {
  it('should build', () => {
    expect(new ExchangesView()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [ExchangesView],
        html: '<exchanges-list></exchanges-list>'
      });
    });
  });
});
