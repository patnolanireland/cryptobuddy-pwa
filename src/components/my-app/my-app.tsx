import '@ionic/core';
import '@stencil/core';
import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';
import { Store } from '@stencil/redux';

import { configureStore } from '../../store';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

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
    return (
      <ion-app>
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
          <ion-loading></ion-loading>
          <ion-animation-controller></ion-animation-controller>
          <ion-gesture-controller></ion-gesture-controller>
        </ion-page>
      </ion-app>
    );
  }
}
