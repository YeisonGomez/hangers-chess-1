import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import {  Box } from '../providers/box.provider';

import { ApiService } from '../services/api.service';
import { BoxService } from '../services/box.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
  	Box,
    ApiService,
    BoxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
