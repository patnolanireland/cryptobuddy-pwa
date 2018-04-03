import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Config } from '@ionic/core';

@Component({
  tag: 'app-header-toolbar',
})
export class AppHeaderToolbar {

  @Prop() title: string = 'Ionic PWA Toolkit';

  @Prop() buttons: JSX.Element[] = [];

  @Prop() history: RouterHistory;

  @Prop({ context: 'config' }) config: Config;

  private renderNav() {
    if (this.history) {
      const backBtnIcon = this.config.get('backButtonIcon', 'arrow-back');
      return (
        <ion-button onClick={ () => this.history.goBack() }>
          <ion-icon name={ backBtnIcon }></ion-icon>
        </ion-button>
      );
    }

    return (
      <app-main-menu-button></app-main-menu-button>
    );
  }

  render() {
    return (
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-buttons slot="start">
            { this.renderNav() }
          </ion-buttons>
          <ion-title>{this.title}</ion-title>
          <ion-buttons slot='end'>
            {this.buttons}
          </ion-buttons>
        </ion-toolbar>
      </ion-header >
    );
  }
}
