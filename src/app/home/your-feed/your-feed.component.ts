import { Component, OnInit } from '@angular/core';
import { YourFeedService } from './your-feed.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.css']
})
export class YourFeedComponent implements OnInit {
  public selected: Array<Object>;
  limit: Number = 10;
  articleCount: Number
  itemPages: any
  tag: string;
  constructor(private getData: YourFeedService, private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.getData.yourFeedArticles().subscribe((status: Array<Object>) => {
      this.saveArticles(status);

      this.itemPages = Array.from(
        new Array(Math.ceil(+this.articleCount / +this.limit)),
        (val, index) => index + 1
      );

    })
  }

  getYourFeed() {
    this.getData.yourFeedArticles().subscribe((status: Array<Object>) => {
      this.saveArticles(status);

      this.itemPages = Array.from(
        new Array(Math.ceil(+this.articleCount / +this.limit)),
        (val, index) => index + 1
      );

    })
  }
  callProfile(username) {
    console.log(username);
    this.route.navigate(["My-Profile", username])

  }
  saveArticles(articles) {
    this.selected = articles;
    this.articleCount = articles.articlesCount;
    console.log(this.selected);
  }
  getArticleDetails(data) {
    this.route.navigate(['articles', data]);

  }
  clickonList(e) {
    let offset = e * +this.limit;
    this.getData.makeFeedsRequestonPages(offset).subscribe((data) => {
      this.saveArticles(data)

    });
  }

  clickonTag(e) {
    this.getData.getTagDetails(e).subscribe((data) => {
      console.log(data);
      this.saveTagName(e);
      this.saveArticles(data)
    })

  }
  saveTagName(e) {
    this.tag = e;
  }
  getGlobalFeed() {
    this.getData.globalFeedArticles().subscribe((status: Array<Object>) => {
      this.saveArticles(status);

      this.itemPages = Array.from(
        new Array(Math.ceil(+this.articleCount / +this.limit)),
        (val, index) => index + 1
      );

    })

  }
  callFavorite(slug) {
    this.getData.makeFavorite(slug).subscribe((status) => {
      
    })

  }
  callUnFavorite(slug) {
    this.getData.makeUnFavorite(slug).subscribe((status) => {
      this.selected=this.selected;
    })

  }
}
