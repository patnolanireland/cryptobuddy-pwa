import { render } from '@stencil/core/testing';
import { CryptobuddyApp } from './cryptobuddy-app';

describe('cryptobuddy-app', () => {
  it('should build', () => {
    expect(new CryptobuddyApp()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [CryptobuddyApp],
        html: '<cryptobuddy-app></crypobuddy-app>'
      });
    });
  });
});
