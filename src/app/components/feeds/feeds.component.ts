import { Component, OnInit } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private _fetchdata: FetchdataService) { }

  toggleColor: boolean = false

  posts: any[] = []
  ngOnInit(): void {
    this.getAllDetails()
  }

  getAllDetails() {
    this._fetchdata.getAllPosts().subscribe((post: any) => {
      this.posts = post
      console.log(this.posts);

    })
  }
}
