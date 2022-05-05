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
  toggleComment: boolean = false
  userDetails?: any
  posts: any[] = []
  ngOnInit(): void {
    this.getAllDetails()
    this.getLocalStorage()
  }

  getAllDetails() {
    this._fetchdata.getAllPosts().subscribe((post: any) => {
      this.posts = post.results
      console.log(this.posts);
    })
  }
  getLocalStorage() {
    this.userDetails = JSON.parse(localStorage.getItem("user") || '{}')

  }

  likeChange(post: any) {
    console.log(post);

    let user = {
      userId: this.userDetails.user._id
    }
    this._fetchdata.likeDislike(post._id, user).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log(error);

    })

  }
  onLikes(index: any) {
    // console.log(index)
    this._fetchdata.likeDislike(index, this.userDetails.user._id).subscribe((data: any) => {
      console.log(data);
      this.getAllDetails();
      // console.log(this.postArr[index]._id)
      // this.id = data._id
      // if (this.postArr[index]._id == this.id) {
      // }
      // this.likes = data.likes?.length
      // if (this.likes == undefined) {
      //   this.likes = 0
      //   console.log(this.likes)
      // }
      // if (this.likes === 1) {
      //   this.like = true
      // }
      // else {
      //   this.like = false
      // }
      // console.log(this.likes)
    })
    // 626ceebd77198639072eeadb/like
  }

  postComment(post: any, commenttxt: string) {
    let postComment = {
      userId: this.userDetails.user._id,
      comment: commenttxt
    }
    this._fetchdata.postComment(post._id, postComment).subscribe(res => {
      console.log(res);
      if (res) {
        window.location.reload()
      }
    }, (err) => {
      console.log(err);

    })

  }
}
