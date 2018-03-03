import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Action, Store } from '@stencil/redux';
import { LoadingController } from '@ionic/core';

import { IStoreState, IView } from '../../model';
import { activateView } from '../../actions/view';
import { loadExchanges } from '../../actions/exchange';
import { IExchange } from '../../model';
import { StateSliceCollection } from '../../store';

@Component({
  tag: 'exchanges-list',
  styleUrl: 'exchanges-list.scss'
})
export class ExchangesView {

  @Prop({ context: 'store' }) store: Store;

  @Prop() match: MatchResults;

  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: LoadingController;

  @State() exchanges: StateSliceCollection<IExchange>;

  private activateView: Action;

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
      activateView,
      loadExchanges,
    });

    const view: IView = {
      title: 'Exchanges',
      match: this.match,
    };

    console.log('componentWillLoad - exchanges', this.exchanges);
    this.activateView(view);

    this.loadingModal = await this.loadingCtrl.create({
      content: `Loading exchanges please wait ...`
    });
  }

  componentDidLoad() {
    this.loadExchanges();
  }

  showOrHideSpinner() {
    if (this.exchanges.loading) {
      this.loadingModal.present();
    } else {
      this.loadingModal.dismiss();
    }

  }

  componentDidUpdate() {
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
        </ion-content>
      </ion-page>
    ];
  }
}
