import { Component } from '@stencil/core';

@Component({
  tag: 'app-main-menu-button',
  styleUrl: 'app-main-menu-button.scss',
})
export class AppMainMenuButton {

  private menu: HTMLIonMenuControllerElement;

  onClick() {
    this.menu.open('left');
  }

  componentWillLoad() {
    this.menu = document.querySelector('ion-menu-controller');
  }

  render() {
    return (
      <ion-button onClick={() => this.onClick()}>
        <ion-icon name="menu"></ion-icon>
      </ion-button>
    );
  }
}
