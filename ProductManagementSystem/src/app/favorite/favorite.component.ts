import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
allFavorites:any;
  constructor(private _http:HttpClient,private api: ApiService,private router:Router) { }

  ngOnInit(): void {
this.getAllFav();
  }
  getAllFav(){
    this.api.getFavourite().subscribe(res => {
      this.allFavorites = res;
    })
  
  }
 dashboard(){
  this.router.navigate(['product']);
 }
     
deleteFav(data:any){
  this.api.deleteFav(data.id).subscribe(res => {
    alert("Product Record Deleted Successfully");
    this.getAllFav();
  },
    err => {
      alert("Something Went Wrong");
    })
}
}
