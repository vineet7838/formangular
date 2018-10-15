import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { YourFeedComponent } from './your-feed/your-feed.component';
import { GlobalFeedComponent } from './global-feed/global-feed.component';
import { DisplayArticleComponent } from '../display-article/display-article.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  declarations: [YourFeedComponent, GlobalFeedComponent,DisplayArticleComponent]
})
export class HomeModule { }