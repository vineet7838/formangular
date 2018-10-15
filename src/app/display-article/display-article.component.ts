import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DisplayServiceService } from './display-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.css']
})
export class DisplayArticleComponent implements OnInit {
public selected: object;
slug: string;
comments:Array<Object>;
  constructor(private router: ActivatedRoute, private getData: DisplayServiceService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
    this.slug = params.get("slug");
    this.getData.getArticleDetails(this.slug).subscribe((status: Object )=> {
        this.saveData(status);
        });
    })
    //It get all the comments of that particular article
    this.getData.getAllComments(this.slug).subscribe((status: Array<Object>)=>{
      this.saveComments(status);
      console.log(status);
    });
  }
  saveData(data){
    this.selected=data;
    console.log(this.selected);
  }
  saveComments(data){
    this.comments=data;
  }
  addComment(comment: NgForm){
    this.getData.postComment(comment.value,this.slug).subscribe((status: Object )=> {console.log(status)});
    this.getData.getAllComments(this.slug).subscribe((status: Array<Object>)=>{
      this.saveComments(status);
      console.log(status);
    });
  }


}
