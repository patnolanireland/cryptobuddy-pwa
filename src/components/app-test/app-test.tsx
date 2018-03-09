import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { IStoreState } from '../../model';
import { loadExchanges } from '../../actions/exchange';
import { IExchange } from '../../model';
import { StateSliceCollection } from '../../store';

@Component({
  tag: 'app-test',
})
export class AppTest {

  @Prop({ context: 'store' }) store: Store;

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
    this.loadExchanges();
  }

  render() {
    return (
      <ion-page>
        <ion-content>
          <p>This is the ct</p>
        </ion-content>
      </ion-page>);
  }
}
