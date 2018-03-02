import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Action, Store } from '@stencil/redux';

import { IView } from '../../model';
import { activateView } from '../../actions/view';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Prop({ context: 'store' }) store: Store;

  @Prop() match: MatchResults;

  private activateView: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      activateView,
    });

    const view: IView = {
      title: '',
      match: this.match,
    };

    this.activateView(view);
  }

  render() {
    return [
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Home</ion-title>
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
