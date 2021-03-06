import '@ionic/core';
import '@stencil/core';
import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';
import { Store } from '@stencil/redux';

import { configureStore } from '../../store';

@Component({
  tag: 'cryptobuddy-app',
  styleUrl: 'cryptobuddy-app.scss'
})
export class CryptobuddyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  @Prop({ context: 'store' }) store: Store;

  componentWillLoad() {
    this.store.setStore(configureStore());
  }

  componentDidLoad() {
    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a
      new version available. When they click the
      reload button it then reloads the page
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        toast.present();
      });
    })
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return [
      <ion-app>
        <ion-menu side="left">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Main Menu</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-list>
              <stencil-route-link url='/exchanges'>
                <ion-item>
                  <ion-menu-toggle menu="left">
                    <ion-button expand="full" fill="clear">
                      <ion-icon name="home" item-start></ion-icon>
                      Exchanges
                    </ion-button>
                  </ion-menu-toggle>
                </ion-item>
              </stencil-route-link>
              <stencil-route-link url='/'>
                <ion-item>
                  <ion-menu-toggle menu="left">
                    <ion-button expand="full" fill="clear">
                      <ion-icon name="chatboxes" item-start></ion-icon>
                      Broker Bot
                  </ion-button>
                  </ion-menu-toggle>
                </ion-item>
              </stencil-route-link>
              <stencil-route-link url='/profile/stencil'>
                <ion-item>
                  <ion-menu-toggle menu="left">
                    <ion-button expand="full" fill="clear">
                      <ion-icon name="glasses" item-start></ion-icon>
                      Watchlist
                    </ion-button>
                  </ion-menu-toggle>
                </ion-item>
              </stencil-route-link>
            </ion-list>
          </ion-content>
          <ion-footer text-center>
            <ion-toolbar color="primary">
              <ion-menu-toggle menu="left">
                <ion-button expand="full" fill="clear">Close</ion-button>
              </ion-menu-toggle>
            </ion-toolbar>
          </ion-footer>
        </ion-menu>
        <ion-page main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>

            <stencil-route url='/profile/:name' component='app-profile'>
            </stencil-route>

            <stencil-route url='/test' component='app-test' exact={true}>
            </stencil-route>

            <stencil-route url='/exchanges' component='exchanges-list' exact={true}>
            </stencil-route>

          </stencil-router>
          <ion-loading-controller></ion-loading-controller>
          <ion-loading cssClass='app-hidden'></ion-loading>
          <ion-animation-controller></ion-animation-controller>
          <ion-gesture-controller></ion-gesture-controller>
        </ion-page>
      </ion-app>,
      <ion-menu-controller></ion-menu-controller>
    ];
  }
}
