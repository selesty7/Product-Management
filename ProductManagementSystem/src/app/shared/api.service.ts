import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductData } from 'src/product.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) {}
    postProduct(data: any){
      return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
        return res;
      }))
    }
    getProduct(){
      return this._http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => {
        return res;
      }))
    }
    updateProduct(data:any,id:number){
      return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
        return res;
      }))
    }

    deleteProduct(id:number){
      return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
        return res;
    }))
  }
  getFavourite(){
    return this._http.get<any>("http://localhost:3000/favourite").pipe(map((res: any) => {
        return res;
      }))
  }
  deleteFav(id:number){
    return this._http.delete<any>("http://localhost:3000/favourite/"+id).pipe(map((res:any)=>{
        return res;
    }))
  }




}

