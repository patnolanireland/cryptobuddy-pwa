import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { IStoreState } from '../../model';
import { loadExchanges } from '../../actions/exchange';
import { IExchange } from '../../model';
import { StateSliceCollection } from '../../store';

@Component({
  tag: 'app-test',
  styleUrl: 'app-test.scss',
})
export class AppTest {

  @Prop({ context: 'store' }) store: Store;

  @Prop({ context: 'isServer' }) private isServer: boolean;

  @State() exchanges: StateSliceCollection<IExchange>;

  private loadExchanges: Action;

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

  }

  componentDidLoad() {
    if (!this.isServer) {
      this.loadExchanges();
    }
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>Test Page</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <p>This is the ct</p>
        </ion-content>
      </ion-page>);
  }
}
