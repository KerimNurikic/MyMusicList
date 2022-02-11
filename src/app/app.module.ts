import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { ShowSongComponent } from './song/show-song/show-song.component';
import { AddEditSongComponent } from './song/add-edit-song/add-edit-song.component';
import {SongApiService} from './song-api.service';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    ShowSongComponent,
    AddEditSongComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SongApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
