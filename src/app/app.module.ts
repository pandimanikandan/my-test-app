import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
