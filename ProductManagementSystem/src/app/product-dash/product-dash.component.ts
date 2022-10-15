import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductData } from 'src/product.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.css']
})
export class ProductDashComponent implements OnInit {

  formValue!: FormGroup
  productModelObj: ProductData = new ProductData;
  allProductData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService,private _http :HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: ['']

    })
    this.getAllData();

  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }
  addProduct() {
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.email = this.formValue.value.email;
    this.productModelObj.mobile = this.formValue.value.mobile;
    this.productModelObj.address = this.formValue.value.address;

    this.api.postProduct(this.productModelObj).subscribe(res => {
      console.log(res);
      alert("Product Records Added Successfully");
      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("Something Went Wrong");
      })
  }
  addFav(data: any) {
    this.productModelObj.id = data.id;
    this.productModelObj.name = data.name;
    this.productModelObj.mobile = data.mobile;
    this.productModelObj.email = data.email;
    this.productModelObj.address = data.address;

    this._http.post<any>(" http://localhost:3000/favourite",this.productModelObj).subscribe(res=>{
      alert("Added to favourite");
    },err=>{
      alert("Already marked as favorites");
    })
    }   

    fetchFav(){
      this.router.navigate(['favourite']);
    }
  getAllData() {
    this.api.getProduct().subscribe(res => {
      this.allProductData = res;
    })
  }
  deleteProducts(data: any) {
    this.api.deleteProduct(data.id).subscribe(res => {
      alert("Product Record Deleted Successfully");
      this.getAllData();
    },
      err => {
        alert("Something Went Wrong");
      })
  }
  onEditProduct(data: any) {
    this.showAdd=false;
    this.showBtn=true;
    this.productModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);


  }
  updateProduct() {
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.email = this.formValue.value.email;
    this.productModelObj.mobile = this.formValue.value.mobile;
    this.productModelObj.address = this.formValue.value.address;

    this.api.updateProduct(this.productModelObj, this.productModelObj.id).subscribe(res => {
      alert("Product Updated Successfully");
      this.getAllData();
    },
      err => {
        alert("Something Went Wrong");
      })
  }
}