import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return [
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>Ionic PWA Toolkit</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <img alt="Cryptobuddy Logo of stock chart" src="assets/logo.svg" />
          <p text-center>Your trading mate for Cryptocurrency</p>
          <div text-center>
            <stencil-route-link url='/profile/stencil'>
              <ion-button>
                Enter
              </ion-button>
            </stencil-route-link>
          </div>
        </ion-content>
      </ion-page>
    ];
  }
}
