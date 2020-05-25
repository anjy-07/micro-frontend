import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GithubprofileComponent } from './githubprofile/githubprofile.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    GithubprofileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [],
  // bootstrap: [AppComponent], // uncomment to run on dev server
  // comment all below to run on dev server
  bootstrap: [],
  entryComponents: [
    AppComponent,
    GithubprofileComponent
  ]
})
export class AppModule {
  // comment all below to run on dev server ng serve
  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const { injector } = this;
    const profileElement = createCustomElement(GithubprofileComponent, {injector});
    customElements.define('ng-profile', profileElement as any);
  }
}
