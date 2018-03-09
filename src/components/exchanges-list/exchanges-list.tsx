import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Action, Store } from '@stencil/redux';
import { LoadingController } from '@ionic/core';

import { IStoreState } from '../../model';
import { loadExchanges } from '../../actions/exchange';
import { IExchange } from '../../model';
import { StateSliceCollection } from '../../store';

@Component({
  tag: 'exchanges-list',
  styleUrl: 'exchanges-list.scss'
})
export class ExchangesList {

  @Prop({ context: 'store' }) store: Store;

  @Prop() match: MatchResults;

  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: LoadingController;

  @Prop({ context: 'isServer' }) private isServer: boolean;

  @State() exchanges: StateSliceCollection<IExchange>;

  private loadExchanges: Action;

  private loadingModal: HTMLIonLoadingElement;

  async componentWillLoad() {

    this.store.mapStateToProps(this, (state: IStoreState) => {
      const {
        exchanges,
      } = state;

      return { exchanges };
    });

    this.store.mapDispatchToProps(this, {
      loadExchanges,
    });

    if (this.isServer) {
      return;
    }

    this.loadingModal = await this.loadingCtrl.create({
      content: `Loading exchanges please wait ...`
    });
  }

  componentDidLoad() {
    if (!this.isServer) {
      this.loadExchanges();
    }
  }

  async showOrHideSpinner() {
    if (this.exchanges.loading) {
      await this.loadingModal.present();
    } else {
      await this.loadingModal.dismiss();
    }

  }

  componentDidUpdate() {
    if (this.isServer) return;

    this.showOrHideSpinner();
  }

  private getExchangesMarkup() {
    if (!this.exchanges) {
      return;
    }

    const { list } = this.exchanges;

    if (list.length < 1) {
      return;
    }

    return (
      <ion-list>
        {list.map((exchange: IExchange) => <exchange-item exchange={exchange} />)}
      </ion-list>
    );
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
          {this.getExchangesMarkup()}
          <ion-loading-controller></ion-loading-controller>
        </ion-content>
      </ion-page>
    ];
  }
}
