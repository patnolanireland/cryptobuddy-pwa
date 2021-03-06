import { Component } from '@stencil/core';

import config from '../../config/active-config.json';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return (
      <ion-page>
        <app-header-toolbar title='Ionic PWA Toolkit'></app-header-toolbar>
        <ion-content>
          <p>
            Welcome to the Ionic PWA Toolkit.
            You can use this starter to build entire PWAs all with
            web components using Stencil and ionic/core! Check out the readme for everything that comes in this starter out of the box and
            Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
          </p>

          <stencil-route-link url='/profile/stencil'>
            <ion-button>
              Profile page
            </ion-button>
          </stencil-route-link>
          <stencil-route-link url='/test'>
            <ion-button>
              Test page
            </ion-button>
          </stencil-route-link>
          <stencil-route-link url='/exchanges'>
            <ion-button>
              Exchanges
            </ion-button>
          </stencil-route-link>

          <p>The API for Cryptobuddy is accessible at {config.ApiEndpoints.cryptobuddy}</p>
        </ion-content>
      </ion-page>
    );
  }
}
