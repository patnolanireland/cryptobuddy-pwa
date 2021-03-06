import { Component, Listen, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { ToastController } from '@ionic/core';
import { urlB64ToUint8Array } from '../../helpers/utils';


@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
})
export class AppProfile {

  @Prop() match: MatchResults;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  @State() notify: boolean;
  @State() swSupport: boolean;

  @Prop() history: RouterHistory;

  // demo key from https://web-push-codelab.glitch.me/
  // replace with your key in production
  publicServerKey = urlB64ToUint8Array('BBsb4au59pTKF4IKi-aJkEAGPXxtzs-lbtL58QxolsT2T-3dVQIXTUCCE1TSY8hyUvXLhJFEUmH7b5SJfSTcT-E');

  componentWillLoad() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      this.swSupport = true;
    } else {
      this.swSupport = false;
    }
  }

  @Listen('ionChange')
  subscribeToNotify($event) {
    console.log($event.detail.checked);

    if ($event.detail.checked === true) {
      this.handleSub();
    }
  }

  handleSub() {
    // get our service worker registration
    navigator.serviceWorker.getRegistration().then((reg: ServiceWorkerRegistration) => {

      if (!reg) {
        console.log('serverWorker exists but registration is undefined');
        return;
      }
      // get push subscription
      reg.pushManager.getSubscription().then((sub: PushSubscription) => {

        // if there is no subscription that means
        // the user has not subscribed before
        if (reg.pushManager && sub === null) {
          // user is not subscribed
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.publicServerKey
          })
            .then((sub: PushSubscription) => {
              // our user is now subscribed
              // lets reflect this in our UI
              console.log('web push subscription: ', sub);

              this.notify = true;
            })
        }
      })
    })
  }

  render() {
    const buttons = [
      <ion-button>
        <ion-icon name='cog'></ion-icon>
      </ion-button>
    ];
    if (this.match && this.match.params.name) {
      return (
        <ion-page>

          <app-header-toolbar title='Profile' buttons={buttons} history={ this.history }></app-header-toolbar>

          <ion-content>
            <p>
              Hello! My name is {this.match.params.name}.
              My name was passed in through a route param!
            </p>

            {this.swSupport ? <ion-item>
              <ion-label>Notifications</ion-label>
              <ion-toggle checked={this.notify} disabled={this.notify}></ion-toggle>
            </ion-item> : null}
          </ion-content>
        </ion-page>
      );
    }
  }
}
