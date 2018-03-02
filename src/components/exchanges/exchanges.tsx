import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Action, Store } from '@stencil/redux';

import { IView } from '../../model';
import { activateView } from '../../actions/view';

@Component({
  tag: 'exchanges-view',
  styleUrl: 'exchanges.scss'
})
export class Exchanges {

  @Prop({ context: 'store' }) store: Store;

  @Prop() match: MatchResults;

  private activateView: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      activateView,
    });

    const view: IView = {
      title: 'Exchanges',
      match: this.match,
    };

    this.activateView(view);
  }

  render() {
    return [
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Exchanges</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <div>Tesing markup</div>
          <p>Placeholder for Cryptocurrency Exchanges</p>
        </ion-content>
      </ion-page>
    ];
  }
}
