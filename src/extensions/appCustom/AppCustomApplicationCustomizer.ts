import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AppCustomApplicationCustomizerStrings';
import {escape} from '@microsoft/sp-lodash-subset';

import styles from './AppCustomizer.module.scss';


const LOG_SOURCE: string = 'AppCustomApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppCustomApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppCustomApplicationCustomizer
  extends BaseApplicationCustomizer<IAppCustomApplicationCustomizerProperties> {


    private _topPlacehodler: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;



  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(placeholdername => PlaceholderName[placeholdername]).join(', '));

    if (!this._topPlacehodler) {
      this._topPlacehodler = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
        onDispose: this._onDispose
      });
      if (!this._topPlacehodler) {
       console.error('The placeholder Top was not found.');
       return
  }
if(this.properties){
  let topString: string = this.properties.Top;
  if (!topString) {
    topString = '(No properties were provided.)';
  }
  if (this._topPlacehodler.domElement){
    this._topPlacehodler.domElement.innerHTML = `
    <div class="${styles.acdemoapp}">
    <div class="ms-bgColor-neutralLighterAlt ${styles.topPlaceholder}">
    <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i>${escape(topString)}
    </div>`;
  }
}
}
if (!this._bottomPlaceholder) {
  this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, {
    onDispose: this._onDispose
  });
  if (!this._bottomPlaceholder) {
   console.error('The placeholder bottom was not found.');
   return
}
if(this.properties){
let bottomString: string = this.properties.Bottom;
if (!bottomString) {
bottomString = '(No properties were provided.)';
}
if (this._bottomPlaceholder.domElement){
this._bottomPlaceholder.domElement.innerHTML = `
<div class="${styles.acdemoapp}">
<div class="ms-bgColor-neutralLighterAlt ${styles.bottomPlaceholder}">
<i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i>${escape(bottomString)}
</div>`;
}
}
}
  }

  private _onDispose(): void {
    console.log('[AppCustomApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}


