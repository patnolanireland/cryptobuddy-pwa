import '@ionic/core';
import '@stencil/core';
import { Component, Prop, Listen, State } from '@stencil/core';
import { ToastController } from '@ionic/core';

@Component({
  tag: 'cryptobuddy-app',
  styleUrl: 'cryptobuddy-app.scss'
})
export class CryptobuddyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  @State() activeView: string = '';

  @Prop() activeMenuTitle: string = 'Main Menu';

  private menu: HTMLIonMenuControllerElement;

  openMainMenu() {
    this.menu.open('left');
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
    });

    this.menu = document.querySelector('ion-menu-controller');
    setTimeout(() => this.activeView = 'Hello Views', 3000);
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <app-header title={this.activeView} />
        <ion-menu side="left">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>{this.activeMenuTitle}</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-list>
              <stencil-route-link url='/'>
                <ion-item>
                  <ion-button expand="full" fill="clear">
                    <ion-icon name="home" item-start></ion-icon>
                    Exchanges
                </ion-button>
                </ion-item>
              </stencil-route-link>
              <stencil-route-link url='/profile/stencil'>
                <ion-item>
                  <ion-button expand="full" fill="clear">
                    <ion-icon name="chatboxes" item-start></ion-icon>
                    Broker Bot
                  </ion-button>
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
          </stencil-router>
        </ion-page>

      </ion-app>
    );
  }
}
