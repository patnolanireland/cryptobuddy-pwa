import { Component, Prop } from '@stencil/core'

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
})
export class AppHeader {

  @Prop() title: string = 'Cryptobuddy';

  private menu: HTMLIonMenuControllerElement;

  openMainMenu() {
    this.menu.open('left');
  }

  componentWillLoad() {
    this.menu = document.querySelector('ion-menu-controller');
  }

  render() {
    return (
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.openMainMenu()}>
              <ion-icon name="menu"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{ this.title }</ion-title>
        </ion-toolbar>
      </ion-header>
    );
  }
}
