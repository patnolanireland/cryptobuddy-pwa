import { Component, Prop } from '@stencil/core';
import { IExchange } from '../../model';

@Component({
  tag: 'exchange-item',
  styleUrl: 'exchange-item.scss',
})
export class ExchangeItem {

  @Prop() exchange: IExchange;

  render() {
    if (!this.exchange) {
      return;
    }

    const exchangeName = this.exchange.name.toLowerCase();

    return (
      <ion-card>
        <ion-item>
          <ion-avatar item-start>
            <img src={this.exchange.logoUrlUnofficial} />
          </ion-avatar>
          <h2>{this.exchange.name}</h2>
          <ion-button item-end>
            <ion-icon name='cog'></ion-icon>
          </ion-button>
        </ion-item>

        <img class="logo" src={this.exchange.logoUrl} />

        <ion-card-content>
          <p>{this.exchange.desc}</p>
        </ion-card-content>

        <div class="links">
          <stencil-route-link url={`/exchanges/${exchangeName}/assets`}>
            Tradable Assets
            </stencil-route-link>
          <stencil-route-link url={`/exchanges/${exchangeName}/asset-pairs`}>
            Asset Pairs
            </stencil-route-link>
        </div>
      </ion-card>
    );
  }
}
